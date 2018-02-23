using System.Collections.Generic;
using System.Linq;
using Todo.Api.Models;

namespace Todo.Api.Repositories
{
    public interface ITodoRepository
    {
        TodoModel AddTodo(TodoModel todo);
        TodoModel UpdateTodo(TodoModel todo);
        void DeleteTodo(int id);
        IList<TodoModel> GetAll();
    }

    public class TodoRepository : ITodoRepository
    {
        private List<TodoModel> todos;
        public TodoRepository()
        {
            this.todos = new List<TodoModel>{
                new TodoModel{
                    Id=1,
                    Title="First todo",
                    Content="This is the first todo",
                    Status=TodoStatus.TODO
                }
            };
        }

        public TodoModel AddTodo(TodoModel todo)
        {
            var newId = 1;
            if (this.todos.Any())
                newId = this.todos.Select(t => t.Id).Max() + 1;

            todo.Id = newId;
            todo.Status = TodoStatus.TODO;
            this.todos.Add(todo);
            return todo;
        }

        public TodoModel UpdateTodo(TodoModel todo)
        {
            var todoToUpdate = this.todos.FirstOrDefault(t => t.Id == todo.Id);
            todoToUpdate.Title = todo.Title;
            todoToUpdate.Content = todo.Content;
            todoToUpdate.Status = todo.Status;
            return todoToUpdate;
        }

        public void DeleteTodo(int id)
        {
            this.todos.Remove(this.todos.FirstOrDefault(t => t.Id == id));
        }

        public IList<TodoModel> GetAll()
        {
            return this.todos;
        }
    }
}