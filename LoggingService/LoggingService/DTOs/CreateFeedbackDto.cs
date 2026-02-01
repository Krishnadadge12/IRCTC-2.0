namespace LoggingService.DTOs
{
    public class CreateFeedbackDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }
        public int Rating { get; set; }
    }
}
