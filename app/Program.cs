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
                    string consulHost = Environment.GetEnvironmentVariable("CONSUL_HOST");
                    string consulKey = Environment.GetEnvironmentVariable("CONSUL_KEY");

                    KVPair response = new ConsulClient(c => c.Address = new Uri(consulHost))
                        .KV
                        .Get(consulKey)
                        .Result
                        .Response;

                    // Flatten the configuration object to form standard .NET colon separated keys
                    // This example assumes configuration is stored as JSON data
                    JObject consulCfgJson = JObject.Parse(Encoding.UTF8.GetString(response.Value));
                    Collection<KeyValuePair<string,string>> consulCfg = new Collection<KeyValuePair<string, string>>();
                    FlattenAndAddJsonCfg(consulCfgJson, consulCfg);

                    cfg.SetBasePath(Directory.GetCurrentDirectory())
                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                        .AddEnvironmentVariables()
                        .AddInMemoryCollection(consulCfg)
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

        static void FlattenAndAddJsonCfg(JObject json, Collection<KeyValuePair<string, string>> flattened, string prefix = "")
        {
            foreach (var kv in json)
            {
                string key = $"{prefix}{kv.Key}";
                JToken value = kv.Value;
                
                switch (value)
                {
                    case JArray a:
                        throw new Exception("Config arrays not supported yet...");
                    case JObject o:
                        // Recursively break down
                        FlattenAndAddJsonCfg(o, flattened, prefix: $"{key}:");
                        break;
                    default:
                        Console.WriteLine($"Added configuration value {key}={value}");
                        flattened.Add(new KeyValuePair<string, string>(key, value.ToString()));
                        break;
                }
            }
        }

        private readonly IConfiguration config;

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
                config["MySql:Host"],
                config["MySql:Database"],
                config["MySql:User"],
                config["MySql:Password"]
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
