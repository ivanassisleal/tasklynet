using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetDevUtility.Domain;
using TasklyNetShared.Data;
using TasklyNetShared.Models;
using TasklyNetWebApi.Dto;

namespace TasklyNetWebApi.Controllers
{
    public class ProjectsController : BaseController
    {
        DataContext _context;

        public ProjectsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var projects = await _context.Projects.AsNoTracking()
                .Select(m=>new { m.Id,m.Title}).ToListAsync();

            return Ok(projects);
        }

        [HttpPost]
        public async Task<IActionResult> Get(DataTableParameterDto parameters)
        {
            // Query Base
            var query = from t in _context.Projects
                        select new
                        {
                            t.Id,
                            t.Active,
                            t.Type,
                            t.Description,
                            t.Title,
                        };

            // Global Filter 
            if (!string.IsNullOrEmpty(parameters.GlobalFilter))
            {
                query = query.Where(m =>
                   EF.Functions.Like(m.Title, $"%{parameters.GlobalFilter}%") ||
                   EF.Functions.Like(m.Description, $"%{parameters.GlobalFilter}%"));
            }

            return Ok(await query.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var project = await _context.Projects.AsNoTracking()
                .Where(m => m.Id == id).FirstOrDefaultAsync();

            return Ok(project);
        }

        [HttpPost("Store")]
        public async Task<IActionResult> Store(Project project)
        {
            project.UserId = (Guid)AuthenticateUserId;

            var notification = NduModel<Project>.Validate(project);
            if (!notification.Success())
                return BadRequest(notification.GetNotifications());

            _context.Entry(project).State = project.Id == Guid.Empty ? EntityState.Added : EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(project);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id)
        {
            var project = await _context.Projects.AsNoTracking()
                .Where(m => m.Id == id).FirstOrDefaultAsync();

            if (project == null)
                return NotFound();

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
