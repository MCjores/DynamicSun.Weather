# DynamicSun.Weather
## Подготовка
### БД
Для БД использую отдельный проект "`DynamicSun.TestProject.Weather.DB`"

В проекте используется PostgreSQL.
Для подключения - не забыть укзаать данные для подключения в файле `WeatherContext`

     protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"Host=localhost;Port=5432;Database=weather;Username=postgres;Password=1234");
        }

### NPM

Перейти в папку `ClientApp`, которая находится в основном проете `DynamicSun.TestProject.Weather`, явно запустить команду `yarn` или `npm install`

##
## Запуск

Запускаем проект `DynamicSun.TestProject.Weather`, переходим по адресу `https://localhost:5001`.

