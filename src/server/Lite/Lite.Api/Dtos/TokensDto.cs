namespace Lite.Api.Dtos;

public record class TokensDto(string AccessToken, string RefreshToken, string Error = "");
