// src/follows/follows.service.ts

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class FollowsService {
  constructor(private prisma: PrismaService) {}

  async followUser(followerId: number, followingId: number): Promise<User> {
    if (followerId === followingId) {
      throw new BadRequestException("You can't follow yourself.");
    }

    // Check if the relationship already exists to prevent duplicates
    const existingFollow = await this.prisma.follows.findUnique({
      where: {
        followerId_followedId: {
          followerId,
          followedId: followingId 
        },
      },
    });

    if (!existingFollow) {
      await this.prisma.follows.create({
        data: {
          followerId,
          followedId: followingId,
        },
      });
    }

    const followingUser = await this.prisma.user.findUnique({ where: { id: followingId } });
    
    // Throw an error if the user is not found to satisfy the return type
    if (!followingUser) {
        throw new BadRequestException("User to follow not found.");
    }

    return followingUser;
  }

  // src/follows/follows.service.ts (only the unfollowUser method)

  async unfollowUser(followerId: number, followingId: number): Promise<User> {
    if (followerId === followingId) {
      throw new BadRequestException("You can't unfollow yourself.");
    }

    try {
      // This will now only execute if the follow relationship exists
      await this.prisma.follows.delete({
        where: {
          followerId_followedId: {
            followerId,
            followedId: followingId,
          },
        },
      });
    } catch (error) {
      // If the record doesn't exist, Prisma throws an error.
      // We catch it and throw a more specific, user-friendly error.
      if (error.code === 'P2025') {
          throw new BadRequestException('You are not following this user.');
      }
      // For any other unexpected errors, re-throw them
      throw error;
    }

    const followingUser = await this.prisma.user.findUnique({ where: { id: followingId } });
      
    if (!followingUser) {
        throw new NotFoundException('User to unfollow not found.');
    }

    return followingUser;
  }
}