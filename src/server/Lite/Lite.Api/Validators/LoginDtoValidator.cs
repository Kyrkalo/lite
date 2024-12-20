﻿using FluentValidation;
using Lite.Models.Dtos;

namespace Lite.Api.Validators;

public class LoginDtoValidator : AbstractValidator<LoginDto>
{
    public LoginDtoValidator() 
    {
        RuleFor(e => e.UserName).NotEmpty();
        RuleFor(e => e.Password).NotEmpty();
    }
}
