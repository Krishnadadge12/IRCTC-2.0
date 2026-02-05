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

        public LogsController(LoggingDbContext context, FileLogger fileLogger)
        {
            _context = context;
            _fileLogger = fileLogger;
        }

        // POST: api/logs
        [HttpPost]
        public async Task<IActionResult> CreateLog([FromBody] CreateLogDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
 

            var log = new LogEntry
            {
                Message = dto.Message,
                Timestamp = DateTime.UtcNow
            };

            _context.Logs.Add(log);
            await _context.SaveChangesAsync();

            await _fileLogger.WriteLogAsync(dto.Message, DateTime.UtcNow);

            return Ok(new { message = "Log saved successfully" });
        }

        // GET: api/logs/db
        [HttpGet("db")]
        public async Task<IActionResult> GetLogsFromDatabase()
        {
            var logs = await _context.Logs
                .OrderByDescending(l => l.Timestamp)
                .ToListAsync();

            return Ok(logs);
        }

        // GET: api/logs/file
        [HttpGet("file")]
        public async Task<IActionResult> GetLogsFromFile()
        {
            var logs = await _fileLogger.ReadLogsAsync();
            return Ok(logs);
        }
    }
}
