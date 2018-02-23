using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Todo.Api.Hubs;
using Todo.Api.Models;
using Todo.Api.Repositories;

namespace Todo.Api.Controllers
{
    [Route("api/todos")]
    public class TodosController : Controller
    {
        private readonly IHubContext<TodoHub> hubcontext;
        private readonly ITodoRepository todoRepository;
        public TodosController(IHubContext<TodoHub> hubcontext, ITodoRepository todoRepository)
        {
            this.hubcontext = hubcontext;
            this.todoRepository = todoRepository;
        }

        [HttpGet]
        public IEnumerable<TodoModel> Get()
        {
            return this.todoRepository.GetAll();
        }

        [HttpGet("{id}")]
        public TodoModel Get(int id)
        {
            return this.todoRepository.GetAll().FirstOrDefault(t => t.Id == id);
        }

        [HttpPost("override")]
        public async Task Post([FromBody]TodoModel[] todos)
        {
            foreach (var todo in this.todoRepository.GetAll().ToArray())
            {
                this.todoRepository.DeleteTodo(todo.Id);
                await this.hubcontext.Clients.All.InvokeAsync("TODO_DELETED", todo.Id);
            }

            foreach (var id in todos.Select(t => t.Id).ToArray())
                await this.hubcontext.Clients.All.InvokeAsync("TODO_DELETED", id);

            foreach (var todo in todos.OrderBy(t => t.Id))
                await this.hubcontext.Clients.All.InvokeAsync("TODO_ADDED", todo);
        }

        [HttpPost]
        public async Task<TodoModel> Post([FromBody]TodoModel todo)
        {
            if (todo.Id != default(int))
                throw new ArgumentException("Id must be empty to create a todo.");

            var addedTodo = this.todoRepository.AddTodo(todo);

            await this.hubcontext.Clients.All.InvokeAsync("TODO_ADDED", addedTodo);

            return addedTodo;
        }

        [HttpPut("{id}")]
        public async Task<TodoModel> Put(int id, [FromBody]TodoModel todo)
        {
            if (!this.todoRepository.GetAll().Any(t => t.Id == todo.Id))
                throw new ArgumentException("Id does not exist.");

            var updatedTodo = this.todoRepository.UpdateTodo(todo);

            await this.hubcontext.Clients.All.InvokeAsync("TODO_UPDATED", updatedTodo);

            return updatedTodo;
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            if (!this.todoRepository.GetAll().Any(t => t.Id == id))
                throw new ArgumentException("Id does not exist.");

            this.todoRepository.DeleteTodo(id);

            await this.hubcontext.Clients.All.InvokeAsync("TODO_DELETED", id);
        }
    }
}
