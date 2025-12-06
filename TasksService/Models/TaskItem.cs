namespace TasksService.Models;

public enum TaskStatus
{
    New,
    InProgress,
    Done
}

public class TaskItem
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public TaskStatus Status { get; set; } = TaskStatus.New;
    public Guid ProjectId { get; set; }
    public Guid AssigneeId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DueDate { get; set; }
}
