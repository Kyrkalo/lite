﻿using Lite.Api.Dtos;
using Lite.Api.Models;

namespace Lite.Api.Extensions;

public static class UserMapper
{
    public static UserDto ToUserDto(this User user)
    {
        return new UserDto()
        {
            UserName = user.UserName,
            Email = user.Email,
            Phone = user.Phone,
        };
    }
}
