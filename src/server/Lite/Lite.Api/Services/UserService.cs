using Lite.Api.Models;
using Lite.Api.Repositories.Interfaces;
using Lite.Api.Services.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Linq;
using System.Threading.Tasks;

namespace Lite.Api.Services;

public class UserService : IUserService
{
    private readonly IRepository<User> _userRepository;

    public UserService(IRepository<User> userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task Create(User user)
    {
        if (user.Id == null) 
        {
            user.Id = ObjectId.GenerateNewId().ToString();
        }
        await _userRepository.CreateAsync(user);
    }

    public async Task<User> Get(User user)
    {
        if (user is null)
            throw new System.Exception("");

        var filter = Builders<User>.Filter.Where(e => e.UserName == user.UserName);
        var result = await _userRepository.FindAsync(filter);

        return result.FirstOrDefault();
    }

    public async Task Update(User user)
    {
        if (user is null)
            throw new System.Exception("");

        await _userRepository.UpdateAsync(user.Id, user);
    }
}
