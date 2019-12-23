using Microsoft.EntityFrameworkCore;

namespace HelloWebApi.Models
{
    public class TodoContext : DbContext 
    {
        public TodoContext(DbContextOptions<TodoContext> options)
                    : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Convert Guid to binary and vice versa
            modelBuilder.Entity<TodoItem>()
                .Property(i => i.Id)
                .HasColumnType("binary(16)");
        }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
