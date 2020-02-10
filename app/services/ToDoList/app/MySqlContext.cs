using HelloWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HelloWebApi
{
    public class MySqlContext : DbContext 
    {
        public MySqlContext(DbContextOptions<MySqlContext> options) : base(options)
        {}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Convert Guid to binary and vice versa
            modelBuilder.Entity<TodoItem>()
                .Property(i => i.Id)
                .HasColumnType("binary(16)");

            // Ignore deleted items
            modelBuilder.Entity<TodoItem>()
                .HasQueryFilter(item => item.DeletedAt == null);
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
