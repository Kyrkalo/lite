using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;

namespace Lite.Api.CustomAttributes;

public class ValitatorAttribute<TValidator, TModel> : ActionFilterAttribute where TValidator : AbstractValidator<TModel>
{
    private readonly TValidator _validator;

    public ValitatorAttribute(TValidator validator) => _validator = validator;

    public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        if (context.ActionArguments.TryGetValue(nameof(TModel), out var actionArgument) && actionArgument is TModel userDto)
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
