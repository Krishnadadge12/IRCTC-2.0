using System.Text;


namespace LoggingService.Services
{
    public class FileLogger
    {
        private readonly string _logFilePath;
        private static readonly SemaphoreSlim _fileLock = new SemaphoreSlim(1, 1);
        private const int MaxRetries = 3;
        private const int RetryDelayMs = 100;

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
            
            // Retry mechanism for handling concurrent file access
            for (int attempt = 0; attempt < MaxRetries; attempt++)
            {
                try
                {
                    // Acquire lock to prevent concurrent writes
                    await _fileLock.WaitAsync();
                    try
                    {
                        await File.AppendAllTextAsync(_logFilePath, logLine, Encoding.UTF8);
                        return; // Success, exit
                    }
                    finally
                    {
                        _fileLock.Release();
                    }
                }
                catch (IOException) when (attempt < MaxRetries - 1)
                {
                    // If file is locked, wait and retry
                    await Task.Delay(RetryDelayMs);
                }
                catch (Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine($"FileLogger Error: {ex.Message}");
                    if (attempt == MaxRetries - 1)
                        throw; // Final attempt failed, throw exception
                }
            }
        }

        public async Task<List<string>> ReadLogsAsync()
        {
            if (!File.Exists(_logFilePath))
                return new List<string>();

            try
            {
                await _fileLock.WaitAsync();
                try
                {
                    var lines = await File.ReadAllLinesAsync(_logFilePath);
                    return lines.ToList();
                }
                finally
                {
                    _fileLock.Release();
                }
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"FileLogger Read Error: {ex.Message}");
                return new List<string>();
            }
        }
    }
}

