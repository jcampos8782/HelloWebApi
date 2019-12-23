using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HelloWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace HelloWebApi.Repositories
{
    public class TodoItemRepository
    {

        private readonly TodoContext context;

        public TodoItemRepository(TodoContext context)
        {
            this.context = context;
        }

        internal async Task<IEnumerable<TodoItem>> GetTodoItemsAsync()
        {
            return await context.TodoItems.ToListAsync();
        }

        internal async Task<TodoItem> FindAsync(Guid id)
        {
            return await context.TodoItems.FindAsync(id);
        }

        internal async Task UpdateAsync(TodoItem todoItem)
        {
            context.Entry(todoItem).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        internal async Task<TodoItem> CreateAsync(TodoItem todoItem)
        {
            // TODO: Make the database update the values
            DateTime now = DateTime.UtcNow;
            todoItem.CreatedAt = now;
            todoItem.ModifiedAt = now;

            context.TodoItems.Add(todoItem);
            await context.SaveChangesAsync();
            return todoItem;
        }

        internal async Task DeleteAsync(TodoItem todoItem)
        {
            todoItem.DeletedAt = DateTime.UtcNow;
            context.Entry(todoItem).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }
    }
}
