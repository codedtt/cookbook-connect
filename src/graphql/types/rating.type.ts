import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user.type';
import { Recipe } from './recipe.type';

@ObjectType()
export class Rating {
  @Field(type => Int)
  id: number;

  @Field(type => Int)
  value: number;

  @Field(type => User)
  user: User;

  @Field(type => Recipe)
  recipe: Recipe;
}
