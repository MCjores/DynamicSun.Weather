﻿// <auto-generated />
using System;
using DynamicSun.TestProject.Weather.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DynamicSun.TestProject.Weather.DB.Migrations
{
    [DbContext(typeof(WeatherContext))]
    [Migration("20220923165625_SetUniqueDateField")]
    partial class SetUniqueDateField
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.17")
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            modelBuilder.Entity("DynamicSun.TestProject.Weather.DB.Models.WeatherData", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("AtmPressure")
                        .HasColumnType("integer");

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("timestamp without time zone");

                    b.Property<int>("H")
                        .HasColumnType("integer");

                    b.Property<string>("Phenomen")
                        .HasColumnType("text");

                    b.Property<double>("Td")
                        .HasColumnType("double precision");

                    b.Property<double>("Temp")
                        .HasColumnType("double precision");

                    b.Property<int>("VV")
                        .HasColumnType("integer");

                    b.Property<double>("Wet")
                        .HasColumnType("double precision");

                    b.Property<string>("WindDirection")
                        .HasColumnType("text");

                    b.Property<int>("WindSpeed")
                        .HasColumnType("integer");

                    b.Property<int>("Сloudiness")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("DateTime")
                        .IsUnique();

                    b.ToTable("WeatherDatas");
                });
#pragma warning restore 612, 618
        }
    }
}
