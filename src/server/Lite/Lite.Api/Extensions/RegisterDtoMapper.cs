using Lite.Api.Dtos;
using Lite.Api.Models;
using System.Net.NetworkInformation;

namespace Lite.Api.Extensions;

public static class RegisterDtoMapper
{
    public static User ToUser(this RegisterDto registerDto)
    {
        return new User()
        {
            Email = registerDto.Email,
            Phone = registerDto.Phone,
            UserName = registerDto.UserName,
            Password = registerDto.Password,
        };
    }
}
