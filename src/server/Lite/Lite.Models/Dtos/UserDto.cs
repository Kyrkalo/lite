namespace Lite.Models.Dtos;

public class UserDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public SettingsDto Settings { get; set; }
    public string Avatar { get; set; }
}
