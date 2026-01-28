using System.ComponentModel.DataAnnotations;

namespace LoggingService.Entities
{
    public class LogEntry
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(2000)]
        public string Message { get; set; } = string.Empty;

        [Required]
        public DateTime Timestamp { get; set; }
    }
}
