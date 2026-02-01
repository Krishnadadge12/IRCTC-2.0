using Microsoft.EntityFrameworkCore;
using LoggingService.Entities;

namespace LoggingService.Data
{
    public class LoggingDbContext : DbContext
    {
        public LoggingDbContext(DbContextOptions<LoggingDbContext> options)
           : base(options)
        {
        }

        public DbSet<LogEntry> Logs => Set<LogEntry>();
        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<FeedbackRating> FeedbackRatings { get; set; }
    }
}
