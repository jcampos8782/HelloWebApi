using System;
using System.IO;
using Serilog;
using HelloWebApi.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Pomelo.EntityFrameworkCore.MySql.Storage;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HelloWebApi
{
    public class Program
    {
        private static IConfiguration Configuration;

        public static void Main(string[] args)
        {

            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(cfg =>
                {
                    Configuration = cfg.SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddEnvironmentVariables()
                        .Build();
                })
                .ConfigureLogging(logging =>
                {
                    logging.AddSerilog();
                })
                .ConfigureServices(services =>
                {
                    string host = Configuration["MySql:Host"];
                    string database = Configuration["MySql:Database"];
                    string user = Configuration["MySql:User"];
                    string password = Configuration["MySql:Password"];

                    services.AddDbContextPool<MySqlContext>(db =>
                    {
                        db.UseMySql(
                            $"Server={host};Database={database};User={user};Password={password}",
                            mysqlOptions => mysqlOptions.ServerVersion(new ServerVersion(new Version(8, 0, 18), ServerType.MySql))
                        );
                    });
                })
                .ConfigureWebHostDefaults(builder => builder.UseStartup<Program>())
                .Build()
                .Run();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<ITodoItemRepository, TodoItemRepository>();
            services.AddControllers();
        }
    }
}
