using Microsoft.EntityFrameworkCore;
using TasksService.Models;

namespace TasksService.Data;

public class TasksDbContext : DbContext
{
    public TasksDbContext(DbContextOptions<TasksDbContext> options) : base(options)
    {
    }

    public DbSet<TaskItem> Tasks => Set<TaskItem>();
}
