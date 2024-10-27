
using Lite.Models.Data;

namespace Lite.Contracts.Services;

public interface IUserService
{
    Task Create(User user);
    Task<User> Get(User user);
    Task Update(User user, User updatedUser);
}
