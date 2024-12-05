
using Lite.Models.Data;
using Lite.Models.Dtos;

namespace Lite.Api.Extensions;

public static class UserMapper
{
    public static AuthUserDto ToAuthUserDto(this User user)
    {
        if (user == null)
            return null;

        return new AuthUserDto
        {
            UserName = user.UserName,
            Email = user.Email,
            Phone = user.Phone,
        };
    }

    public static User ToUser(this AuthUserDto user)
    {
        if (user == null)
            return null;

        return new User
        {
            UserName = user.UserName,
            Email = user.Email,
            Phone = user.Phone,
        };
    }

    public static UserDto ToUserDto(this User user)
    {
        if (user == null)
            return null;

        return new UserDto
        {
            UserName = user.UserName,
            Email = user.Email,
            Phone = user.Phone,
            Avatar = user.Avatar,
            Settings = user.Settings == null ? null : new SettingsDto
            {
                UseLocalStorage = user.Settings.UseLocalStorage
            },
            Contacts = user.Contacts?.Select(x => new ContactDto
            {
                Photo = x.Photo,
                UserName = x.UserName
            })
        };
    }


    public static User ToUser(this UserDto user)
    {
        if (user == null)
            return null;

        return new User
        {
            UserName = user.UserName,
            Email = user.Email,
            Phone = user.Phone,
            Avatar = user.Avatar,
            Settings = new Settings
            {
                UseLocalStorage = user.Settings?.UseLocalStorage
            },
            Contacts = user.Contacts.Select(x => new Contact() { Photo = x.Photo, UserName = x.UserName }).ToList()
        };
    }
}
