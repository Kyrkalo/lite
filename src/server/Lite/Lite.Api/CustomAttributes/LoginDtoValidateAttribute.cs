using Lite.Api.Dtos;
using Lite.Api.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Lite.Api.CustomAttributes;

[Obsolete]
public class LoginDtoValidateAttribute : ActionFilterAttribute
{
    private readonly LoginDtoValidator _validator;

    public LoginDtoValidateAttribute(LoginDtoValidator validator) => _validator = validator;

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
