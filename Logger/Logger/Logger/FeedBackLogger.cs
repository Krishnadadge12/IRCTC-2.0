using System.IO;

namespace Logger.Logger
{
    public class FeedBackLogger
    {
        private static readonly object _lock = new();
        private static FeedBackLogger _instance;
        public static FeedBackLogger Instance =>
            _instance ??= new FeedBackLogger();

        private readonly string _filePath = "D:\\Feedbacklogger\\feedback.txt";

        public void LogBackLogger(string feedback)
        {
            lock (_lock)
            {
                File.AppendAllText(
                    _filePath,
                    $"{DateTime.Now} - FEEDBACK: {feedback}{Environment.NewLine}");
            }
        }
    }
}
