using LoggingService.Data;
using LoggingService.DTOs;
using LoggingService.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LoggingService.Controllers
{
    [Route("api/feedback")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly LoggingDbContext _context;

        public FeedbackController(LoggingDbContext context)
        {
            _context = context;
        }

        // USER → SAVE FEEDBACK
        [HttpPost]
        public async Task<IActionResult> Create(CreateFeedbackDto dto)
        {
            var feedback = new Feedback
            {
                Name = dto.Name,
                Email = dto.Email,
                Message = dto.Message,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow
            };

            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // ADMIN → VIEW FEEDBACK
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _context.Feedbacks
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync());
        }
    }
}
    