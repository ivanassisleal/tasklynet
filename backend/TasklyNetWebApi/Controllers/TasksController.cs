using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NetDevUtility.Domain;
using TasklyNetShared.Data;
using TasklyNetWebApi.Dto;
using TasklyNetWebApi.Extensios;

namespace TasklyNetWebApi.Controllers
{

    public class TasksController : BaseController
    {
        DataContext _context;

        public TasksController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Get(DataTableParameterDto parameters)
        {
            // Query Base
            var query = from t in _context.Tasks
                        join p in _context.Projects on t.ProjectId equals p.Id
                        select new
                        {
                            t.Id,
                            Project = p.Title,
                            t.Done,
                            t.Description,
                            t.Title,
                        };

            // Global Filter 
            if(!string.IsNullOrEmpty(parameters.GlobalFilter))
            {
                query = query.Where(m =>
                   EF.Functions.Like(m.Title, $"%{parameters.GlobalFilter}%") ||
                   EF.Functions.Like(m.Description, $"%{parameters.GlobalFilter}%"));
            }

            // Recourd Count
            var recordCount = await query.CountAsync();

            // Paginate
            var tasks = await query.Paginate(parameters.Page, parameters.Take).ToListAsync();

            return Ok(new PaginateDto
            {
                Total = recordCount,
                Page = parameters.Page,
                Records = tasks.ToList()
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var task = await _context.Tasks.AsNoTracking().Where(m => m.Id == id).FirstOrDefaultAsync();

            return Ok(task);
        }

        [HttpPost("Store")]
        public async Task<IActionResult> Store(TasklyNetShared.Models.Task task)
        {
            if (task == null) return NotFound();

            task.UserId = (Guid)AuthenticateUserId;

            var notification =  NduModel<TasklyNetShared.Models.Task>.Validate(task);
            if (!notification.Success())
                return BadRequest(notification.GetNotifications());

            _context.Entry(task).State = task.Id == Guid.Empty ? EntityState.Added : EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id)
        {
            var task = await _context.Tasks.AsNoTracking()
                .Where(m => m.Id == id).FirstOrDefaultAsync();

            if (task == null)
                return NotFound();

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
