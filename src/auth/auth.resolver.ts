// src/auth/auth.resolver.ts

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { UnauthorizedException } from '@nestjs/common/exceptions';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('input') input: LoginInput) {
    const user = await this.authService.validateUser(input.email, input.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(user);
  }
}