using System;
using System.IO;
using Consul;
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
using System.Text;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace HelloWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration(cfg =>
                {
                    // TODO: Set consul URL in ENV
                    ConsulClient consul = new ConsulClient(c => c.Address = new Uri("http://consul:8500"));
                    KVPair response = consul.KV.Get("databases/mysql").Result.Response;
                    JObject mysqlCfg = JObject.Parse(Encoding.UTF8.GetString(response.Value));
                    Collection<KeyValuePair<string,string>> c = new Collection<KeyValuePair<string, string>>();

                    foreach(var val in mysqlCfg)
                    {
                        c.Add(new KeyValuePair<string,string>(val.Key, val.Value.ToString()));
                    }

                    cfg.SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddEnvironmentVariables()
                        .AddInMemoryCollection(c)
                        .Build();
                })
                .ConfigureLogging(logging =>
                {
                    Log.Logger = new LoggerConfiguration()
                        .Enrich.FromLogContext()
                        .WriteTo.Debug()
                        .WriteTo.Console(
                            outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj} {Properties:j}{NewLine}{Exception}")
                        .CreateLogger();

                    logging.AddSerilog();
                })
                .ConfigureServices(services =>
                {
                })
                .ConfigureWebHostDefaults(builder => builder.UseStartup<Program>())
                .Build()
                .Run();
        }

        private IConfiguration config;

        public Program(IConfiguration config)
        {
            this.config = config;
        }

        public void ConfigureServices(IServiceCollection services)
        {

            // Set up repositories for injection
            services.AddTransient<ITodoItemRepository, TodoItemRepository>();

            // Retrieve configuration from Consul
            // Configure database connection
            string connectionString = String.Format(
                "Server={0};Database={1};User={2};Password={3}",
                config["host"],
                config["database"],
                config["user"],
                config["password"]
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
