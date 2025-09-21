// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '../graphql/inputs/user-create.input';
import * as bcrypt from 'bcrypt';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(input: UserCreateInput) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(input.password, saltOrRounds);
    return this.prisma.user.create({
      data: {
        ...input,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        recipes: {
          select: {
            id: true,
            title: true,
            description: true,
            cuisine: true,
            difficulty: true,
            cookingTime: true,
            author: true,
            ingredients: true,
            instructions: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        following: {
          select: {
            followed: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        followers: {
          select: {
            follower: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        recipes: {
          select: {
            id: true,
            title: true,
            description: true,
            cuisine: true,
            difficulty: true,
            cookingTime: true,
            author: true,
            ingredients: true,
            instructions: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async findByEmailWithPassword(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        recipes: {
          select: {
            id: true,
            title: true,
            description: true,
            cuisine: true,
            difficulty: true,
            cookingTime: true,
            author: true,
            ingredients: true,
            instructions: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
  }

  async followUser(followerId: number, followedId: number) {
    if (followerId === followedId) {
      throw new Error("You cannot follow yourself");
    }

    await this.prisma.follows.create({
    data: {
      followerId,
      followedId,
      },
    });

    // return the user with followers/following
    return this.prisma.user.findUnique({
      where: { id: followerId },
      include: {
        following: { select: { followed: { select: { id: true, name: true, email: true } } } },
        followers: { select: { follower: { select: { id: true, name: true, email: true } } } },
      },
    });
  }

  async unfollowUser(followerId: number, followedId: number) {
    await this.prisma.follows.delete({
      where: {
        followerId_followedId: { followerId, followedId }, // compound unique
      },
    });

    // return the user with followers/following
    return this.prisma.user.findUnique({
      where: { id: followerId },
      include: {
        following: { select: { followed: { select: { id: true, name: true, email: true } } } },
        followers: { select: { follower: { select: { id: true, name: true, email: true } } } },
      },
    });
  }


}