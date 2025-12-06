using Microsoft.EntityFrameworkCore;
using ProjectsService.Models;

namespace ProjectsService.Data;

public class ProjectsDbContext : DbContext
{
    public ProjectsDbContext(DbContextOptions<ProjectsDbContext> options) : base(options)
    {
    }

    public DbSet<Project> Projects => Set<Project>();
}
