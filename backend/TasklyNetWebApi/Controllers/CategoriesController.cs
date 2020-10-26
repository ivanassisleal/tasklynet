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
    public class CategoriesController : BaseController
    {
        DataContext _context;

        public CategoriesController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Get(DataTableParameterDto parameters)
        {
            // Query Base
            var query = _context.Categories.AsQueryable();          

            // Global Filter 
            if (!string.IsNullOrEmpty(parameters.GlobalFilter))
                query = query.Where(m => EF.Functions.Like(m.Description, $"%{parameters.GlobalFilter}%"));

            return Ok(await query.ToListAsync());
        }

        [HttpPost("Store")]
        public async Task<IActionResult> Store(Category category)
        {
            category.UserId = (Guid)AuthenticateUserId;

            var notification = NduModel<Category>.Validate(category);
            if (!notification.Success())
                return BadRequest(notification.GetNotifications());

            _context.Entry(category).State = category.Id == Guid.Empty ? EntityState.Added : EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(category);
        }
    }
}
