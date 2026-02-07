package com.mrc.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.ResourceAccessException;

import com.mrc.dtos.CreateLogRequest;
import lombok.extern.slf4j.Slf4j;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Enhanced Logger Client with:
 * - Async queue-based processing to prevent blocking
 * - Retry mechanism with exponential backoff
 * - Thread-safe operations
 */
@Component
@Slf4j
public class LoggerClient {

    private final RestTemplate restTemplate = new RestTemplate();
    
    @Value("${logger.url}")
    private String loggerUrl;
    
    @Value("${logger.max-retries:3}")
    private int maxRetries;
    
    @Value("${logger.retry-delay-ms:500}")
    private int retryDelay;
    
    private final BlockingQueue<String> logQueue = new LinkedBlockingQueue<>();
    private final AtomicBoolean isProcessing = new AtomicBoolean(false);

    public LoggerClient() {
        // Start background queue processor
        startQueueProcessor();
    }

    /**
     * Non-blocking log method - adds to queue and returns immediately
     */
    public void log(String message) {
        try {
            logQueue.offer(message);
            // Ensure processor is running
            if (!isProcessing.get()) {
                processQueueAsync();
            }
        } catch (Exception e) {
            log.error("[LOG] Queue error: {}", e.getMessage());
        }
    }

    /**
     * Process logs from queue asynchronously
     */
    private void processQueueAsync() {
        Thread processorThread = new Thread(() -> {
            isProcessing.set(true);
            
            while (!logQueue.isEmpty()) {
                try {
                    String message = logQueue.poll();
                    if (message != null) {
                        sendLogWithRetry(message);
                    }
                } catch (Exception e) {
                    log.error("[LOG] Processing error: {}", e.getMessage());
                }
            }
            
            isProcessing.set(false);
        }, "LoggerQueueProcessor");
        
        processorThread.setDaemon(true);
        processorThread.start();
    }

    /**
     * Start background processor thread
     */
    private void startQueueProcessor() {
        Thread processor = new Thread(() -> {
            while (true) {
                try {
                    String message = logQueue.take(); // Blocks until message available
                    sendLogWithRetry(message);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                } catch (Exception e) {
                    log.error("[LOG] Processor error: {}", e.getMessage());
                }
            }
        }, "LoggerBackgroundProcessor");
        
        processor.setDaemon(true);
        processor.start();
    }

    /**
     * Send log with retry mechanism
     */
    private void sendLogWithRetry(String message) {
        for (int attempt = 0; attempt < maxRetries; attempt++) {
            try {
                sendLogToRemote(message);
                return; // Success
            } catch (ResourceAccessException e) {
                // Network/connection error - retry
                if (attempt < maxRetries - 1) {
                    log.warn("[LOG] Connection error (attempt {}/{}), retrying: {}", 
                             attempt + 1, maxRetries, e.getMessage());
                    try {
                        Thread.sleep(retryDelay * (long) Math.pow(2, attempt)); // Exponential backoff
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        break;
                    }
                } else {
                    log.error("[LOG] Failed after {} retries: {}", maxRetries, message);
                }
            } catch (HttpClientErrorException e) {
                // HTTP error - don't retry
                log.error("[LOG] HTTP error ({}): {}", e.getStatusCode(), message);
                break;
            } catch (Exception e) {
                // Any other exception
                log.error("[LOG] Unexpected error: {}", e.getMessage());
                break;
            }
        }
    }

    /**
     * Send log to remote logging service
     */
    private void sendLogToRemote(String message) {
        try {
            CreateLogRequest request = new CreateLogRequest(message);
            restTemplate.postForObject(loggerUrl, request, Void.class);
            log.debug("[LOG] Remote log sent successfully: {}", message);
        } catch (ResourceAccessException e) {
            // Re-throw for retry handling
            throw e;
        } catch (Exception e) {
            // Re-throw all exceptions for unified handling
            throw new RuntimeException(e);
        }
    }

}


