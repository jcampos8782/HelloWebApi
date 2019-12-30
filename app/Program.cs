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
using Microsoft.Extensions.Logging;
using Serilog.Formatting.Json;
using Serilog.Sinks.RabbitMQ;

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

                    Configuration = cfg.SetBasePath(Directory.GetCurrentDirectory())
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
                                .WriteTo.Console()
                                .WriteTo.RabbitMQ((clientConfiguration, sinkConfiguration) => {
                                    clientConfiguration.Username = Configuration["RabbitMq:User"];
                                    clientConfiguration.Password = Configuration["RabbitMq:Password"];
                                    clientConfiguration.Exchange = Configuration["RabbitMq:Exchange"];
                                    clientConfiguration.ExchangeType = Configuration["RabbitMq:ExchangeType"];
                                    clientConfiguration.RouteKey = Configuration["RabbitMq:RouteKey"];
                                    clientConfiguration.Port = Int32.Parse(Configuration["RabbitMq:Port"]);
                                    clientConfiguration.DeliveryMode = RabbitMQDeliveryMode.Durable;

                                    foreach (string hostname in Configuration["RabbitMq:Hostnames"].Split(","))
                                    {
                                        clientConfiguration.Hostnames.Add(hostname);
                                    }

                                    sinkConfiguration.TextFormatter = new JsonFormatter();
                                })
                                .CreateLogger();

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

        static void FlattenAndAddJsonCfg(JObject json, Collection<KeyValuePair<string, string>> flattened, string prefix = "")
        {
            foreach (var kv in json)
            {
                string key = $"{prefix}{kv.Key}";
                JToken value = kv.Value;
                
                switch (value)
                {
                    case JArray a:
                        // Don't have any array objects so far so just ignore this
                        // for now. 
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
