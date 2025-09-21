// src/auth/auth.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from '../graphql/inputs/login.input';
import { AuthPayload } from '../graphql/types/auth-payload.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log('Password from input:', pass);
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
       throw new BadRequestException('Invalid credentials.');
    }
    const { password, ...result } = user;
    return result;
  }

  async login(input: LoginInput): Promise<AuthPayload> {
    const user = await this.validateUser(input.email, input.password);
    const payload = { email: user.email, userId: user.id };
    console.log(user);
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
} 