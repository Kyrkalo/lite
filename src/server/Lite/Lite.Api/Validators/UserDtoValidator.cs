using FluentValidation;
using Lite.Models.Dtos;

namespace Lite.Api.Validators;

public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(e => e.UserName).NotEmpty();
        RuleFor(e => e.Email).NotEmpty();
        RuleFor(e => e.Phone).NotEmpty();
    }
}
