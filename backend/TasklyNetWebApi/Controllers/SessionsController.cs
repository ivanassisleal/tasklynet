using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NetDevUtility.Security;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TasklyNetShared;
using TasklyNetShared.Services;

namespace TasklyNetWebApi.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class SessionsController : ControllerBase
    {
        IUserAuthenticateService _userAuthenticateService;

        public SessionsController(IUserAuthenticateService userAuthenticateService)
        {
            _userAuthenticateService = userAuthenticateService;
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(UserAuthenticateRequest request)
        {
            var response = await _userAuthenticateService.Execute(request);

            if (!response.notification.Success())
                return BadRequest(response.notification.GetNotifications());

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, new NduCrypto(Settings.CRYPTO_KEY).Encrypt(response.user.Id.ToString()))
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Settings.TOKEN_SECRET)),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            string token = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            return Ok(new { token });
        }
    }
}
