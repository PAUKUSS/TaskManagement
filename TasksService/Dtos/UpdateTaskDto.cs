namespace TasksService.Dtos;

public class UpdateTaskDto
{
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public Guid ProjectId { get; set; }
    public Guid AssigneeId { get; set; }
    public DateTime? DueDate { get; set; }
}
