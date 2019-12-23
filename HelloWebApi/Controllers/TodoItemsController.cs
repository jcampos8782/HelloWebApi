using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HelloWebApi.Models;
using System;
using HelloWebApi.Repositories;

namespace HelloWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : ControllerBase
    {
        private readonly TodoItemRepository repository;

        // TODO: Improve DI
        public TodoItemsController(TodoContext context) :
            this(new TodoItemRepository(context))
        { }

        private TodoItemsController(TodoItemRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            return new OkObjectResult(await repository.GetTodoItemsAsync());
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(Guid id)
        {
            var todoItem = await repository.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return new OkObjectResult(todoItem);
        }

        // PUT: api/TodoItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoItem(Guid id, TodoItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            TodoItem item = await repository.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            await repository.UpdateAsync(todoItem);
            return NoContent();
        }

        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            await repository.CreateAsync(todoItem);
            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(Guid id)
        {
            var todoItem = await repository.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            await repository.DeleteAsync(todoItem);
            return new OkObjectResult(todoItem);
        }
    }
}
