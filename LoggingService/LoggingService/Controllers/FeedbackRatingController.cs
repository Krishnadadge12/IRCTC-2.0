using LoggingService.Data;
using LoggingService.DTOs;
using LoggingService.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace LoggingService.Controllers
{
    [ApiController]
    [Route("api/feedback-rating")]
    
    public class FeedbackRatingController : ControllerBase
    {
        private readonly LoggingDbContext _context;

        public FeedbackRatingController(LoggingDbContext context)
        {
            _context = context;
        }

        // USER → SAVE EMAIL + RATING
        [HttpPost]
        [Authorize] // if user is logged in then only he can send feedback/rating
        public async Task<IActionResult> Create([FromBody] CreateFeedbackRatingDto dto)
        {
            Console.WriteLine("API HIT");
            // Console.WriteLine(dto.Email);
            var email = User.FindFirst(ClaimTypes.Email)?.Value ??
                        User.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
                        User.FindFirst("sub")?.Value;
            if (email == null)
                return Unauthorized("Invalid token");
            Console.WriteLine(dto.Rating);
            var rating = new FeedbackRating
            {
                Email = email,
                Rating = dto.Rating,
                CreatedAt = DateTime.UtcNow
            };

            _context.FeedbackRatings.Add(rating);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // ADMIN → ALL RATINGS (GRID)
        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.FeedbackRatings
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();

           

            return Ok(data);
        }

        // ADMIN → CHART SUMMARY
        [HttpGet("summary")]
        public IActionResult GetSummary()
        {
            var result = _context.FeedbackRatings
                .GroupBy(x => x.Rating)
                .Select(g => new
                {
                    Rating = g.Key,
                    Count = g.Count()
                })
                .OrderBy(x => x.Rating)
                .ToList();

            return Ok(result);
        }

        // ADMIN → AVERAGE RATING
        [HttpGet("average")]
        public IActionResult GetAverage()
        {
            var avg = _context.FeedbackRatings.Any()
                ? _context.FeedbackRatings.Average(x => x.Rating)
                : 0;

            return Ok(Math.Round(avg, 2));
        }
    }
}