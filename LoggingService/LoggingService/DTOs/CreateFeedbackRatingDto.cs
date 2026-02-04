using System.ComponentModel.DataAnnotations;

namespace LoggingService.DTOs
{
    public class CreateFeedbackRatingDto
    {
       // [Required]
        //[EmailAddress]
       // public string Email { get; set; } = string.Empty;

        [Range(1, 5)]
        public int Rating { get; set; }
    }
}
