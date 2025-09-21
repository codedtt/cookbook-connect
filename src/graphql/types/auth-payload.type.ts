// src/graphql/types/auth-payload.type.ts

import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.type';

@ObjectType()
export class AuthPayload {
  @Field()
  access_token: string;

  @Field(() => User)
  user: User;
}