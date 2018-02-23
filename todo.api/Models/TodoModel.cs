namespace Todo.Api.Models
{
    public static class TodoStatus
    {
        public static string TODO = "Todo";
        public static string DOING = "Doing";
        public static string DONE = "Done";
    }
    public class TodoModel
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ContentHtml { get; set; }
    }
}