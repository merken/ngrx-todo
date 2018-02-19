
using Microsoft.AspNetCore.SignalR;
using Todo.Api.Models;

namespace Todo.Api.Hubs
{
    public class TodoHub : Hub
    {
        public void AddTodo(Models.Todo todo)
        {
            Clients.All.InvokeAsync("todo-added", todo);
        }
    }
}