// src/follows/follows.resolver.ts

import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { User } from '../graphql/types/user.type';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver()
export class FollowsResolver {
  constructor(private readonly followsService: FollowsService) {}

  @Mutation(() => User, { name: 'followUser' })
  @UseGuards(GqlAuthGuard)
  async followUser(
    @CurrentUser() user: any,
    @Args('followingId', { type: () => Int }) followingId: number,
  ) {
    console.log(user, followingId);
    return this.followsService.followUser(user.id, followingId);
  }

  @Mutation(() => User, { name: 'unfollowUser' })
  @UseGuards(GqlAuthGuard)
  async unfollowUser(
    @CurrentUser() user: any,
    @Args('followingId', { type: () => Int }) followingId: number,
  ) {
    return this.followsService.unfollowUser(user.id, followingId);
  }
}