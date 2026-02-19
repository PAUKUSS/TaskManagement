using System.Net.Http;
using System.Net.Http.Json;

namespace TaskManagerUI.Services
{
    public class ApiService
    {
        private readonly HttpClient _client;

        // Обязательно ставим ApiGateway
        public ApiService(HttpClient client)
        {
            _client = client;
            _client.BaseAddress = new Uri("http://localhost:5207/"); // <-- ApiGateway порт
        }

        public class User
        {
            public Guid Id { get; set; }
            public string UserName { get; set; } = "";
            public string Email { get; set; } = "";
            public DateTime CreatedAt { get; set; }
        }

        public class Project
        {
            public Guid Id { get; set; }
            public string Name { get; set; } = "";
            public string? Description { get; set; }
            public Guid OwnerId { get; set; }
            public DateTime CreatedAt { get; set; }
        }

        public class TaskItem
        {
            public Guid Id { get; set; }
            public string Title { get; set; } = "";
            public string? Description { get; set; }
            public string Status { get; set; } = "";
            public Guid ProjectId { get; set; }
            public Guid AssigneeId { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime? DueDate { get; set; }
        }

        public async Task<List<User>> GetUsersAsync()
            => await _client.GetFromJsonAsync<List<User>>("users") ?? new List<User>();

        public async Task<List<Project>> GetProjectsAsync()
            => await _client.GetFromJsonAsync<List<Project>>("projects") ?? new List<Project>();

        public async Task<List<TaskItem>> GetTasksAsync()
            => await _client.GetFromJsonAsync<List<TaskItem>>("tasks") ?? new List<TaskItem>();
    }
}
