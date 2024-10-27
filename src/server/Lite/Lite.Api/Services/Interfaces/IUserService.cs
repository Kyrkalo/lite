﻿using Lite.Api.Models;

namespace Lite.Api.Services.Interfaces;

public interface IUserService
{
    Task Create(User user);
    Task<User> Get(User user);
    Task Update(User user, User updatedUser);
}
