namespace Lite.Api.Dtos;

public class AuthUserDto
{
    public string UserName { get; set; }
    public string Token { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public SettingsDto Settings { get; set; }
}
