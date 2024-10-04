namespace Lite.Api.Dtos;

public class RegisterDto
{
    public string UserName { get; set; }

    public string Phone { get; set; }

    public string VerificationCode { get; set; }

    public string Email { get; set; }

    public string Step { get; set; }

    public string Password { get; set; }
}
