using System.ComponentModel.DataAnnotations;

namespace LoggingService.DTOs
{
    public class CreateLogDto
    {
        [Required]
        [MaxLength(2000)]
        public string Message { get; set; } = string.Empty;

        [Required]
        public DateTime Timestamp { get; set; }
    }
}
