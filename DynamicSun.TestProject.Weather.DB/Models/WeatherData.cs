using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DynamicSun.TestProject.Weather.DB.Models
{
    public class WeatherData
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public double Temp { get; set; }
        public double Wet { get; set; }
        public double Td { get; set; }
        public int AtmPressure { get; set; }
        public string WindDirection { get; set; }
        public int WindSpeed { get; set; }
        public int Сloudiness { get; set; }
        public int H { get; set; }
        public int VV { get; set; }
        public string Phenomen { get; set; }

        public override bool Equals(object obj)
        {
            return this.Equals(obj as WeatherData);
        }

        public bool ExactEquals(WeatherData weather)
        {
            return
                DateTime == weather.DateTime
                &&
                Temp == weather.Temp
                &&
                Wet == weather.Wet
                &&
                Td == weather.Td
                &&
                 AtmPressure == weather.AtmPressure
                &&
                WindDirection == weather.WindDirection
                &&
                WindSpeed == weather.WindSpeed
                &&
                Сloudiness == weather.Сloudiness
                &&
                H == weather.H
                &&
                VV == weather.VV
                &&
                Phenomen == weather.Phenomen;

        }

        public override int GetHashCode()
        {
            return DateTime.GetHashCode();
        }

        private bool Equals(WeatherData weather)
        {
            if (weather == null)
                return false;

            return object.Equals(DateTime, weather.DateTime);
        }
    }
}
