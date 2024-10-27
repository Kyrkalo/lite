using Lite.Models.Data;
using Lite.Models.Data.Enums;
using Lite.Models.Dtos;

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

    public static ApplicationUser ToApplicationUser(this RegisterDto registerDto, VerifyType verifyType = VerifyType.None)
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
