using Lite.Api.Commands.User;
using Lite.Models.Data;

namespace Lite.Api.Extensions;

public static class UpdateExtensions
{
    public static User ToUser(this Update update)
    {
        return new User()
        {
            Avatar = update.Avatar,
            Email = update.Email,
            Phone = update.Phone
        };
    }
}
