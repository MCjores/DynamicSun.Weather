using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicSun.TestProject.Weather.Services
{
    public class PathsService
    {
        private readonly string _rootDirectory;
        private readonly string _logDirectory;
        private readonly string _tempDirectory;

        public PathsService(string app = "WeatherApp")
        {
            _rootDirectory = Path.Combine(Directory.GetCurrentDirectory(), app);
            _tempDirectory = Path.Combine(_rootDirectory, "Temp");
            _logDirectory = Path.Combine(_rootDirectory, "Logs");

            Directory.CreateDirectory(_rootDirectory);
            Directory.CreateDirectory(_tempDirectory);
            Directory.CreateDirectory(_logDirectory);
        }

        public string LogDirectory => _logDirectory;
        public string TempDirectory => _tempDirectory;

    }
}
