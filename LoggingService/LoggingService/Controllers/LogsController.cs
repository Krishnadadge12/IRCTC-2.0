using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LoggingService.Data;
using LoggingService.DTOs;
using LoggingService.Entities;
using LoggingService.Services;

namespace LoggingService.Controllers
{
    [ApiController]
    [Route("api/logs")]
    public class LogsController : ControllerBase
    {
        private readonly LoggingDbContext _context;
        private readonly FileLogger _fileLogger;
        private readonly ILogger<LogsController> _logger;

        public LogsController(LoggingDbContext context, FileLogger fileLogger, ILogger<LogsController> logger)
        {
            _context = context;
            _fileLogger = fileLogger;
            _logger = logger;
        }

        // POST: api/logs
        [HttpPost]
        public async Task<IActionResult> CreateLog([FromBody] CreateLogDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrWhiteSpace(dto.Message))
                return BadRequest(new { error = "Message cannot be empty" });

            bool dbSaved = false;
            bool fileSaved = false;
            string errors = string.Empty;

            var log = new LogEntry
            {
                Message = dto.Message,
                Timestamp = DateTime.UtcNow
            };

            // Try to save to database
            try
            {
                _context.Logs.Add(log);
                await _context.SaveChangesAsync();
                dbSaved = true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Database save failed: {ex.Message}");
                errors += $"DB Error: {ex.Message}; ";
            }

            // Try to save to file (independent of database result)
            try
            {
                await _fileLogger.WriteLogAsync(dto.Message, DateTime.UtcNow);
                fileSaved = true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"File save failed: {ex.Message}");
                errors += $"File Error: {ex.Message}; ";
            }

            // Return success only if at least one storage mechanism succeeded
            if (dbSaved || fileSaved)
            {
                return Ok(new
                {
                    message = "Log saved successfully",
                    dbSaved = dbSaved,
                    fileSaved = fileSaved,
                    warnings = dbSaved && fileSaved ? null : errors.TrimEnd()
                });
            }
            else
            {
                return StatusCode(500, new { error = "Failed to save log to any storage", details = errors });
            }
        }

        // GET: api/logs/db
        [HttpGet("db")]
        public async Task<IActionResult> GetLogsFromDatabase()
        {
            try
            {
                var logs = await _context.Logs
                    .OrderByDescending(l => l.Timestamp)
                    .ToListAsync();

                return Ok(logs);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to retrieve database logs: {ex.Message}");
                return StatusCode(500, new { error = "Failed to retrieve logs from database", details = ex.Message });
            }
        }

        // GET: api/logs/file
        [HttpGet("file")]
        public async Task<IActionResult> GetLogsFromFile()
        {
            try
            {
                var logs = await _fileLogger.ReadLogsAsync();
                return Ok(logs);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to retrieve file logs: {ex.Message}");
                return StatusCode(500, new { error = "Failed to retrieve logs from file", details = ex.Message });
            }
        }
    }
}
