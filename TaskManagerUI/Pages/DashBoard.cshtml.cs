using Microsoft.AspNetCore.Mvc.RazorPages;
using TaskManagerUI.Services;

namespace TaskManagerUI.Pages
{
    public class DashboardModel : PageModel
    {
        private readonly ApiService _api;

        public DashboardModel(ApiService api) => _api = api;

        public List<ApiService.User> Users { get; set; } = new();
        public List<ApiService.Project> Projects { get; set; } = new();
        public List<ApiService.TaskItem> Tasks { get; set; } = new();

        public async Task OnGetAsync()
        {
            Users = await _api.GetUsersAsync();
            Projects = await _api.GetProjectsAsync();
            Tasks = await _api.GetTasksAsync();
        }
    }
}
