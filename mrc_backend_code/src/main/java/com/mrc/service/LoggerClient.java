package com.mrc.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.mrc.dtos.CreateLogRequest;
@Component
public class LoggerClient {

	private final RestTemplate restTemplate = new RestTemplate();

    @Value("${logger.url}")
    private String loggerUrl;

    public void log(String message) {
        try {
            CreateLogRequest request = new CreateLogRequest(message);
            restTemplate.postForObject(loggerUrl, request, Void.class);
        } catch (Exception e) {
            // logger must NEVER break booking flow
            System.out.println("Logger failed: " + e.getMessage());
        }
    }
	
}
