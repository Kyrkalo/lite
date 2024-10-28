using Lite.Api.Extensions;
using Lite.Contracts.Queries;
using Lite.Contracts.Repositories;
using Lite.Models.Data;
using Lite.Models.Dtos;
using MongoDB.Driver;

namespace Lite.Api.Queries;

public class UserQueryHandler(IRepository<User> userRepository) : IQueryHandler<string, UserDto>
{
    private readonly IRepository<User> _userRepository = userRepository;

    public async Task<UserDto> HandleAsync(string query)
    {
        if (query is null)
            throw new System.Exception("");

        var filter = Builders<User>.Filter.Where(e => e.UserName == query);
        var result = await _userRepository.FindAsync(filter);
        var user = result.FirstOrDefault();
        UserDto userDto = null;
        if (user != null)
        {
            userDto = user.ToUserDto();
        }
        return userDto;
    }
}
