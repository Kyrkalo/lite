using Lite.Models.Data;
using Lite.Models.Dtos;

namespace Lite.Api.Extensions;

public static class LoginDtoMapper
{
    public static User ToUser(this LoginDto loginDto)
    {
        return new User()
        {
            UserName = loginDto.UserName,
        };
    }
}
