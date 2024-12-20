﻿using Lite.Api.Services;
using AspNetCore.Identity.MongoDbCore.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Lite.Api.Repositories;
using Lite.Api.Validators;
using MongoDB.Driver;
using Lite.Api.CustomAttributes;
using Lite.Contracts.Services;
using Lite.Contracts.Repositories;
using Lite.Models.Data;
using Lite.Models.Dtos;
using Lite.Contracts.Commands;
using Lite.Contracts.Pipelines;
using Lite.Contracts.Queries;
using Lite.Api.Queries;
using Lite.Api.Commands.User;
using Lite.Api.Commands.Auth;

namespace Lite.Api.Middleware;

public static class Setup
{
    public static void SetupServices(this WebApplicationBuilder builder)
    {
        var config = builder.Configuration;
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IRepository<User>,  Repository<User>>();
        builder.Services.AddScoped<IAuthService, AuthService>();

        builder.Services.AddScoped<LoginDtoValidator>();
        builder.Services.AddScoped<RegisterDtoValidator>();
        builder.Services.AddScoped<UserDtoValidator>();
        builder.Services.AddScoped<ValitatorAttribute<UserDtoValidator, UserDto>>();
        builder.Services.AddScoped<ValitatorAttribute<RegisterDtoValidator, RegisterDto>>();
        builder.Services.AddScoped<ValitatorAttribute<LoginDtoValidator, LoginDto>>();

        builder.Services.AddScoped<IRegisterCommand, RegisterCommand>();
        builder.Services.AddScoped<ILogoutCommand, LogoutCommand>();
        builder.Services.AddScoped<ILoginCommand, LoginCommand>();
        builder.Services.AddScoped<ICreateUserCommand, CreateCommand>();
        builder.Services.AddScoped<IUpdateUserCommand,  UpdateCommand>();

        builder.Services.AddScoped<IPipeline, Pipelines.Pipeline>();

        builder.Services.AddScoped<IQueryHandler<string, UserDto>, UserQueryHandler>();
    }

    public static void SetupMongoDbIdentity(this WebApplicationBuilder builder, ConfigurationManager configuration)
    {
        IConfigurationSection mongoSettings = configuration.GetSection("MongoDbSettings");

        builder.Services.AddScoped<IMongoDatabase>(e => 
        {
            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(mongoSettings["ConnectionString"]));

            //settings.ReadConcern = ReadConcern.Majority;
            //settings.ReadPreference = ReadPreference.Primary;
            //settings.SslSettings = new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

            //settings.ServerApi = new ServerApi(ServerApiVersion.V1);
            var mongoClient = new MongoClient(settings);
            return mongoClient.GetDatabase(mongoSettings["AppDb"]);
        });

        builder.Services.AddIdentity<ApplicationUser, MongoIdentityRole>()
        .AddMongoDbStores<ApplicationUser, MongoIdentityRole, System.Guid>(mongoSettings["ConnectionString"], mongoSettings["IdentityDb"])
        .AddDefaultTokenProviders();
    }

    public static void SetupAuthentication(this WebApplicationBuilder builder, ConfigurationManager configuration)
    {
        IConfigurationSection jwtSettings = configuration.GetSection("JwtSettings");

        var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.RequireHttpsMetadata = false;
            options.SaveToken = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                NameClaimType = "name"
            };
        });
    }
}
