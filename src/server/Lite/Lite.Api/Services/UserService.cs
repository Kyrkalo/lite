using Lite.Contracts.Repositories;
using Lite.Contracts.Services;
using Lite.Models.Data;
using MongoDB.Bson;
using MongoDB.Driver;

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

    [Obsolete]
    public async Task<User> Get(User user)
    {
        if (user is null)
            throw new System.Exception("");

        var filter = Builders<User>.Filter.Where(e => e.UserName == user.UserName);
        var result = await _userRepository.FindAsync(filter);

        return result.FirstOrDefault();
    }

    public async Task Update(User user, User updatedUser)
    {
        if (user is null || updatedUser is null)
            throw new System.Exception("");

        user.Avatar = updatedUser.Avatar;
        user.Email = updatedUser.Email;
        user.Phone = updatedUser.Phone;

        await _userRepository.UpdateAsync(user.Id, user);
        
    }
}
