using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using HelloWebApi.Models;

namespace HelloWebApi.Repositories
{
    public interface ITodoItemRepository
    {
        public Task<IEnumerable<TodoItem>> GetTodoItemsAsync();

        public Task<TodoItem> FindAsync(Guid id);

        public Task UpdateAsync(TodoItem todoItem);

        public Task<TodoItem> CreateAsync(TodoItem todoItem);

        public Task DeleteAsync(TodoItem todoItem);
    }
}
