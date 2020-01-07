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
        private readonly ITodoItemRepository repository;

        public TodoItemsController(ITodoItemRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItems()
        {
            // TODO: Move these to some middleware 
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return new OkObjectResult(await repository.GetTodoItemsAsync());
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(Guid id)
        {
            // TODO: Move these to some middleware 
            Response.Headers.Add("Access-Control-Allow-Origin", "*");

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
            // TODO: Move these to some middleware 
            Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            TodoItem item = await repository.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.ModifiedAt = DateTime.UtcNow;
            item.IsComplete = todoItem.IsComplete;
            item.Name = todoItem.Name;

            await repository.UpdateAsync(item);
            return NoContent();
        }

        // POST: api/TodoItems
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            // TODO: Move these to some middleware 
            Response.Headers.Add("Access-Control-Allow-Origin", "*");

            await repository.CreateAsync(todoItem);
            return CreatedAtAction(nameof(GetTodoItem), new { id = todoItem.Id }, todoItem);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(Guid id)
        {
            // TODO: Move these to some middleware 
            Response.Headers.Add("Access-Control-Allow-Origin", "*");

            var todoItem = await repository.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            await repository.DeleteAsync(todoItem);
            return new OkObjectResult(todoItem);
        }

        [HttpOptions]
        public IActionResult AllowOptions()
        {
            // TODO: Move these to some middleware 
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Access-Control-Allow-Headers", "*");
            Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            return Ok();
        }

        [HttpOptions("{id}")]
        public IActionResult AllowIdOptions()
        {
            // TODO: Move these to some middleware 
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            Response.Headers.Add("Access-Control-Allow-Headers", "*");
            Response.Headers.Add("Access-Control-Allow-Methods", "GET, PUT, DELETE, OPTIONS");
            return Ok();
        }
    }
}
