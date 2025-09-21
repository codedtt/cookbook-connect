// src/graphql/types/user.type.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Recipe } from './recipe.type';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;

  @Field(() => [Recipe])
  recipes: Recipe[];

  @Field(() => [User], { nullable: true })
  following: User[];

  @Field(() => [User], { nullable: true })
  followers: User[];
}