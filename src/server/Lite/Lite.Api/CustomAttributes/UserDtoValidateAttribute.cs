using FluentValidation;
using Lite.Api.Dtos;
using Lite.Api.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Threading.Tasks;

namespace Lite.Api.CustomAttributes;

public class UserDtoValidateAttribute : ActionFilterAttribute
{
    private readonly UserDtoValidator _validator;

    public UserDtoValidateAttribute(UserDtoValidator validator) => _validator = validator;

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.ActionArguments.TryGetValue(nameof(LoginDto), out var actionArgument) && actionArgument is LoginDto userDto)
        {
            var result = await _validator.ValidateAsync(userDto);
            if (!result.IsValid)
            {
                context.Result = new BadRequestObjectResult(result.Errors);
                return;
            }
        }

        await next();
    }
}
