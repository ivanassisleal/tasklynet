using Microsoft.EntityFrameworkCore;
using NetDevUtility.Domain;
using NetDevUtility.Security;
using System.Linq;
using System.Threading.Tasks;
using TasklyNetShared.Data;
using TasklyNetShared.Models;

namespace TasklyNetShared.Services
{
    public class UserAuthenticateRequest
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }

    public interface IUserAuthenticateService
    {
        Task<(NduNotification notification, User user)> Execute(UserAuthenticateRequest request);
    }

    public class UserAuthenticateService: IUserAuthenticateService
    {
        DataContext _context;

        public UserAuthenticateService(DataContext context)
        {
            _context = context;
        }

        public async Task<(NduNotification notification, User user)> Execute(UserAuthenticateRequest request)
        {
            var notification = new NduNotification();

            var crypto = new NduCrypto(Settings.CRYPTO_KEY);

            var passwordEncrypted = crypto.Encrypt(request.Password);

            var user = await _context.Users
                .Where(m => m.Email == request.Email && m.Password == passwordEncrypted)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                notification.AddNotification("User or Password invalid");
                return (notification,null);
            }

            return (notification, user);
        }
    }
}
