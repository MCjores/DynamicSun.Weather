using DynamicSun.TestProject.Weather.DB.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace DynamicSun.TestProject.Weather.DB
{
    public class WeatherContext : DbContext
    {
        public WeatherContext()
        {
            Database.EnsureCreated();
        }

        public DbSet<WeatherData> WeatherDatas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<WeatherData>()
                .HasIndex(p => p.DateTime)
                .IsUnique(true);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"Host=localhost;Port=5432;Database=weather;Username=postgres;Password=1234");
        }

    }
}
