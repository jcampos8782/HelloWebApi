using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HelloWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HelloWebApi.Repositories
{
    public class TodoItemRepository : ITodoItemRepository
    {

        private readonly MySqlContext context;

        public TodoItemRepository(MySqlContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<TodoItem>> GetTodoItemsAsync()
        {
            return await context.TodoItems.ToListAsync();
        }

        public async Task<TodoItem> FindAsync(Guid id)
        {
            return await context.TodoItems.FindAsync(id);
        }

        public async Task UpdateAsync(TodoItem todoItem)
        {
            context.Entry(todoItem).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        public async Task<TodoItem> CreateAsync(TodoItem todoItem)
        {
            // TODO: Make the database update the values
            DateTime now = DateTime.UtcNow;
            todoItem.CreatedAt = now;
            todoItem.ModifiedAt = now;

            context.TodoItems.Add(todoItem);
            await context.SaveChangesAsync();
            return todoItem;
        }

        public async Task DeleteAsync(TodoItem todoItem)
        {
            todoItem.DeletedAt = DateTime.UtcNow;
            context.Entry(todoItem).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }
    }
}
