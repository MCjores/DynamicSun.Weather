using DynamicSun.TestProject.Weather.DB;
using DynamicSun.TestProject.Weather.DB.Models;
using DynamicSun.TestProject.Weather.Services;
using Microsoft.AspNetCore.Http;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicSun.TestProject.Weather.Factories
{
    public class CellDataFactory
    {
        private readonly string _path;

        public CellDataFactory(PathsService pathsService)
        {
            _path = pathsService.TempDirectory;
        }


        public List<WeatherData> CreateListWeatherDBmodel(IFormFile file)
        {
            if (file.Length > 0)
            {
                List<WeatherData> listWeatherDB = new List<WeatherData>();

                string fileExtention = Path.GetExtension(file.FileName).ToLower();
                string fullPath = Path.Combine(_path, file.FileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    IWorkbook workbook;
                    file.CopyTo(stream);
                    stream.Position = 0;

                    workbook = GetCurrentVersionExcelFile(fileExtention, stream);
                    int countSheets = workbook.NumberOfSheets;

                    for (int i = 0; i <= countSheets - 1; i++)
                    {
                        ISheet currentCheet = workbook.GetSheetAt(i);
                        int startSearchIndex = 4;
                        int rowCountsec = currentCheet.LastRowNum;

                        listWeatherDB.AddRange(ReadDataFromSheet(currentCheet, startSearchIndex, rowCountsec));
                    }
                }
                File.Delete(fullPath);
                return listWeatherDB;
            }
            else throw new Exception();
        }

        public WeatherData CreateWeatherDBmodel(List<ICell> cells)
        {
            try
            {
                var date = GetStringDataCell(cells[0]);
                var time = GetStringDataCell(cells[1]);
                var temp = GetNumericDataCell(cells[2]);
                var wet = GetNumericDataCell(cells[3]);
                var td = GetNumericDataCell(cells[4]);
                var atm = GetNumericDataCell(cells[5]);
                var directionWing = GetStringDataCell(cells[6]);
                var speedWing = GetNumericDataCell(cells[7]);
                var cloudness = GetNumericDataCell(cells[8]);
                var h = GetNumericDataCell(cells[9]);
                var vv = GetNumericDataCell(cells[10]);
                var phenomen = cells.Count > 11 ? GetStringDataCell(cells[11]) : "";

                WeatherData weatherData = new WeatherData()
                {
                    DateTime = DateTime.Parse(date + " " + time),
                    Temp = temp,
                    Wet = wet,
                    Td = td,
                    AtmPressure = (int)atm,
                    WindDirection = directionWing,
                    WindSpeed = (int)speedWing,
                    Сloudiness = (int)cloudness,
                    H = (int)h,
                    VV = (int)vv,
                    Phenomen = phenomen
                };

                return weatherData;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        private double GetNumericDataCell(ICell cell)
        {
            double dataCell = cell.CellType switch
            {
                CellType.Numeric => cell.NumericCellValue,
                _ => 0
            };
            return dataCell;
        }

        private string GetStringDataCell(ICell cell)
        {
            string dataCell = cell.CellType switch
            {
                CellType.String => cell.StringCellValue.Trim(),
                _ => ""
            };
            return dataCell;
        }

        private IWorkbook GetCurrentVersionExcelFile(string fileExtentions, FileStream fileStream)
        {
            if (fileExtentions == ".xls")
                return new HSSFWorkbook(fileStream); //This will read the Excel 97-2000 formats  
            else
                return new XSSFWorkbook(fileStream); //This will read 2007 Excel format  
        }

        private List<WeatherData> ReadDataFromSheet(ISheet currentCheet, int startSell, int endSell)
        {
            List<WeatherData> list = new List<WeatherData>();

            for (int i = startSell; i <= endSell; i++)
            {
                var weatherData = CreateWeatherDBmodel(currentCheet.GetRow(i).Cells);
                list.Add(weatherData);
            }
            return list;
        }
    }
}
