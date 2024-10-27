using Lite.Api.Validators;
using Lite.Models.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Lite.Api.CustomAttributes;

[Obsolete]
public class RegisterDtoValidateAttribute : ActionFilterAttribute
{
    private readonly RegisterDtoValidator _validator;

    public RegisterDtoValidateAttribute(RegisterDtoValidator validator) => _validator = validator;

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.ActionArguments.TryGetValue(nameof(RegisterDto), out var actionArgument) && actionArgument is RegisterDto userDto)
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
