using Lite.Api.Dtos;
using Lite.Api.Models;

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
        };
    }

    public static ApplicationUser ToApplicationUser(this RegisterDto registerDto, Models.Enums.VerifyType verifyType = Models.Enums.VerifyType.None)
    {
        return new ApplicationUser
        {
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            PhoneNumber = registerDto.Phone,
            Verify = verifyType,
        };
    }
}
