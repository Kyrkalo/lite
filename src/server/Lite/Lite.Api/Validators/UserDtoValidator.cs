using FluentValidation;
using Lite.Api.Dtos;

namespace Lite.Api.Validators;

public class UserDtoValidator : AbstractValidator<LoginDto>
{
    public UserDtoValidator() 
    {
        RuleFor(e => e.UserName).NotEmpty();
        RuleFor(e => e.Password).NotEmpty();
    }
}
