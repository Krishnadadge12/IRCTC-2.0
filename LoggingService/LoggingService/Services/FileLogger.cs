using System.Text;


namespace LoggingService.Services
{
    public class FileLogger
    {
        private readonly string _logFilePath;

        public FileLogger()
        {
            var logDirectory = Path.Combine(Directory.GetCurrentDirectory(), "logs");

            if (!Directory.Exists(logDirectory))
                Directory.CreateDirectory(logDirectory);

            _logFilePath = Path.Combine(logDirectory, "app-logs.txt");
        }

        public async Task WriteLogAsync(string message, DateTime timestamp)
        {
            var logLine = $"{timestamp:O} | {message}{Environment.NewLine}";
                await File.AppendAllTextAsync(_logFilePath, logLine, Encoding.UTF8);
        }

        public async Task<List<string>> ReadLogsAsync()
        {
            if (!File.Exists(_logFilePath))
                return new List<string>();

            var lines = await File.ReadAllLinesAsync(_logFilePath);
            return lines.ToList();
        }
    }
}

