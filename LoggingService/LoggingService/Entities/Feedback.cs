using System.ComponentModel.DataAnnotations;

namespace LoggingService.Entities
{
    public class Feedback
    {
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(2000)]
        public string Message { get; set; } = string.Empty;

        [Range(1, 5)]
        public int Rating { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
