using System.ComponentModel.DataAnnotations;

namespace LoggingService.Entities
{
    public class FeedbackRating
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        [Range(1, 5)]
        public int Rating { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}
