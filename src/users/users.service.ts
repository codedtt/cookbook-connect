import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '../graphql/inputs/user-create.input';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(input: UserCreateInput) {
    // You should add password hashing here using a library like `bcrypt`
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(input.password, saltOrRounds);
    return this.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
      },
      include: {
        recipes: {
          include: {
            author: true,
            ingredients: true,
            instructions: true,
          },
        },
      },
    });
  }
}