using System.IO;
namespace Logger.Logger
{
    public class FileLogger
    {
        private static FileLogger logger = new FileLogger();
        private FileLogger() 
        { 

        }

        public static FileLogger CurrentLogger
        {
            get
            {
                return logger;
            }
        }

        public void Log(string message)
        {
            FileStream fileStream = null;
            string path = "D:\\FileLogger\\Log.txt";

            if (File.Exists(path))
            {
                fileStream = new FileStream(path,FileMode.Append,FileAccess.Write);
            }
            else
            {
                fileStream = new FileStream(path,FileMode.Create,FileAccess.Read);
            }

            StreamWriter writer = new StreamWriter(fileStream);
            writer.WriteLine(string.Format("Logged at {0}: {1}", DateTime.Now.ToString(), message));
            writer.WriteLine("----------------------------------");
            writer.Close();
            fileStream.Close();
            writer = null;
            fileStream = null;
        }
    }
}
