using System;
using HelloWebApi.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Pomelo.EntityFrameworkCore.MySql.Storage;

namespace HelloWebApi
{
    public class App
    {
        public static void Main(string[] args)
        {
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(builder => builder.UseStartup<App>())
                .Build()
                .Run();
        }

        public App(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Set up repositories for injection
            services.AddTransient<ITodoItemRepository, TodoItemRepository>();

            // Configure database connection
            string connectionString = String.Format(
                "Server={0};Database={1};User={2};Password={3}",
                Configuration["mysql:host"],
                Configuration["mysql:database"],
                Configuration["mysql:user"],
                Configuration["mysql:password"]
                );
            
            services.AddDbContextPool<MySqlContext>(db =>
            {
                db.UseMySql(connectionString, mysqlOptions =>
                     mysqlOptions.ServerVersion(new ServerVersion(new Version(8, 0, 18), ServerType.MySql))
                );
            });

            services.AddControllers();
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
    }
}
