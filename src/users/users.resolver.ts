import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from '../graphql/types/user.type';
import { UserCreateInput } from '../graphql/inputs/user-create.input';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async register(@Args('input') input: UserCreateInput): Promise<User> {
    return this.usersService.createUser(input);
  }
}