using System;
using Microsoft.EntityFrameworkCore;

namespace HelloWebApi.Models
{
    public class TodoContext : DbContext 
    {
        public TodoContext(DbContextOptions<TodoContext> options)
                    : base(options)
        {
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
