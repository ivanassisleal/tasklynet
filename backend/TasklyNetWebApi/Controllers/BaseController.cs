using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetDevUtility.Security;
using TasklyNetShared;

namespace TasklyNetWebApi.Controllers
{
    [Authorize]
    [Route("[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected Guid? AuthenticateUserId
        {
            get
            {
                try
                {
                    var crypto = new NduCrypto(Settings.CRYPTO_KEY);

                    IEnumerable<Claim> claims = HttpContext.User.Claims;

                    var userId = Convert.ToString(crypto.Decrypt(claims.FirstOrDefault(m => m.Type == ClaimTypes.NameIdentifier).Value));

                    return Guid.Parse(userId);
                }
                catch
                {
                    return null;
                }
            }
        }
    }
}
