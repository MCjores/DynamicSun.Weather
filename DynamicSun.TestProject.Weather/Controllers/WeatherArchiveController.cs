using DynamicSun.TestProject.Weather.DB;
using DynamicSun.TestProject.Weather.DB.Models;
using DynamicSun.TestProject.Weather.Factories;
using DynamicSun.TestProject.Weather.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace DynamicSun.TestProject.Weather.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherArchiveController : Controller
    {
        private WeatherContext _dbContext;
        private CellDataFactory _cellDataFactory;
        private string _currFile;

        private readonly string _path;

        public WeatherArchiveController(CellDataFactory cellDataFactory, WeatherContext weatherContext, PathsService pathsService)
        {
            _dbContext = weatherContext;
            _cellDataFactory = cellDataFactory;

            _path = pathsService.TempDirectory;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile() //IformFile
        {
            int countAdd = 0;
            int countUpdate = 0;

            try
            {
                var files = Request.Form.Files;
                foreach (var file in files)
                {
                    _currFile = file.FileName;
                    var fieldsList = _cellDataFactory.CreateListWeatherDBmodel(file).ToHashSet();
                    var fieldsDB = _dbContext.WeatherDatas.ToHashSet();

                    if (fieldsList.Count == 0)
                        throw new Exception();

                    foreach (var model in fieldsList)
                    {
                        if (fieldsDB.Contains(model))
                        {
                            var field = _dbContext.WeatherDatas.FirstOrDefault(m => m.DateTime == model.DateTime);
                            model.Id = field.Id;
                            if (!model.ExactEquals(field))
                            {
                                _dbContext.Entry(field).CurrentValues.SetValues(model);
                                countUpdate++;
                            }
                        }
                        else
                        {
                            _dbContext.WeatherDatas.Add(model);
                            countAdd++;
                        }
                    }


                    await _dbContext.SaveChangesAsync();
                }

                return Ok($"Добавлено: {countAdd}. Обновлено: {countUpdate}");
            }
            catch (FormatException ex)
            {
                string msg = "";
                if (countAdd != 0)
                    msg += $"Добавлено: {countAdd}.";
                if (countUpdate != 0)
                    msg += $"Добавлено: {countAdd}.";

                msg += $"\nНеверный формат записи данных. Файл: {_currFile}";

                return BadRequest(msg);
            }
            catch (Exception ex)
            {
                string msg = "";
                if (countAdd != 0)
                    msg += $"Добавлено: {countAdd}.";
                if (countUpdate != 0)
                    msg += $"Добавлено: {countAdd}.";

                msg += $"\nПроверьте корректность файла '{_currFile}'";

                return BadRequest(msg);
            }


        }

        [HttpPost]
        public async Task<IActionResult> CreteField(WeatherData entity)
        {
            try
            {
                await _dbContext.WeatherDatas.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAllField()
        {
            try
            {
                var result = _dbContext.WeatherDatas.ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpGet("Range")]
        public IActionResult GetRangeField(DateTime timeStart, DateTime timeEnd)
        {
            try
            {
                var result = _dbContext.WeatherDatas.Where(w => w.DateTime >= timeStart && w.DateTime <= timeEnd);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpDelete]
        public IActionResult DeleteAllField()
        {
            try
            {
                var result = _dbContext.WeatherDatas;
                _dbContext.RemoveRange(result);
                _dbContext.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
