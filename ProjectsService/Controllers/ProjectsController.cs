using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectsService.Data;
using ProjectsService.Models;

namespace ProjectsService.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectsDbContext _db;

    public ProjectsController(ProjectsDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetAll()
    {
        var projects = await _db.Projects.AsNoTracking().ToListAsync();
        return Ok(projects);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<Project>> GetById(Guid id)
    {
        var project = await _db.Projects.FindAsync(id);
        if (project is null)
            return NotFound();

        return Ok(project);
    }

    [HttpPost]
    public async Task<ActionResult<Project>> Create([FromBody] Project project)
    {
        project.Id = Guid.NewGuid();
        project.CreatedAt = DateTime.UtcNow;

        _db.Projects.Add(project);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }
}
