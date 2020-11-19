using Microsoft.EntityFrameworkCore;
using NetDevUtility.Domain;
using NetDevUtility.Security;
using System.Threading.Tasks;
using TasklyNetShared.Data;
using TasklyNetShared.Models;

namespace TasklyNetShared.Services
{
    public class AccountCreateRequest
    {
        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }
    }

    public interface IAccountCreateService
    {
        Task<NduNotification> Execute(AccountCreateRequest request);
    }

    public class AccountCreateService : IAccountCreateService
    {
        DataContext _context;

        public AccountCreateService(DataContext context)
        {
            _context = context;
        }

        public async Task<NduNotification> Execute(AccountCreateRequest request)
        {
            var result = new NduNotification();

            var userAccountExists = await _context.Users
                .AnyAsync(m => m.Email == request.Email);

            if (userAccountExists)
            {
                result.AddNotification("Email","User already exists");
                return result;
            }

            if (request.Password != request.ConfirmPassword)
            {
                result.AddNotification("Password not match");
                return result;
            }

            var crypto = new NduCrypto(Settings.CRYPTO_KEY);

            var passwordEncrypted = crypto.Encrypt(request.Password);

            var user = new User()
            {
                Email = request.Email,
                Name = request.Name,
                Password = passwordEncrypted
            };

            result = NduModel<User>.Validate(user);

            if (result.Success())
            {
                _context.Entry(user).State = EntityState.Added;
                await _context.SaveChangesAsync();
            }

            return result;
        }
    }
}
