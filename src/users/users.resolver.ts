import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '../graphql/types/user.type';
import { UserCreateInput } from '../graphql/inputs/user-create.input';
import { UsersService } from './users.service';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CurrentAuthUser } from '../auth/current-auth-user.decorator';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async register(@Args('input') input: UserCreateInput): Promise<User> {
    const created = await this.usersService.createUser(input);
    return {
      ...created,
      recipes: [],
      following: [],
      followers: [],
    };
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async followUser(
    @CurrentAuthUser() currentUser: User,
    @Args('followingId') userIdToFollow: string, // <-- Ensure this matches your mutation
  ) {
    return this.usersService.followUser(currentUser.id, parseInt(userIdToFollow, 10));
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async unfollowUser(
    @CurrentAuthUser() currentUser: User,
    @Args('followingId') userIdToUnfollow: string, // <-- And this one
  ) {
    return this.usersService.unfollowUser(currentUser.id, parseInt(userIdToUnfollow, 10));
  }
}