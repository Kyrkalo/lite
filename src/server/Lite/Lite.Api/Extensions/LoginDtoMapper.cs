using Lite.Api.Dtos;
using Lite.Api.Models;

namespace Lite.Api.Extensions;

public static class LoginDtoMapper
{
    public static User ToUser(this LoginDto loginDto)
    {
        return new User()
        {
            Password = loginDto.Password,
            UserName = loginDto.UserName,
        };
    }
}
