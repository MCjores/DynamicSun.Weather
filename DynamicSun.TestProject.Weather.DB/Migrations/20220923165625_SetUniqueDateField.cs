using Microsoft.EntityFrameworkCore.Migrations;

namespace DynamicSun.TestProject.Weather.DB.Migrations
{
    public partial class SetUniqueDateField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_WeatherDatas_DateTime",
                table: "WeatherDatas",
                column: "DateTime",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WeatherDatas_DateTime",
                table: "WeatherDatas");
        }
    }
}
