using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TasklyNetShared.Services;

namespace TasklyNetWebApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        IAccountCreateService _accountCreateService;

        public AccountsController(IAccountCreateService accountCreateService)
        {
            _accountCreateService = accountCreateService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(AccountCreateRequest request)
        {
            var response = await _accountCreateService.Execute(request);
            if(!response.Success())
                return BadRequest(response.GetNotifications());

            return Ok();
        }
    }
}
