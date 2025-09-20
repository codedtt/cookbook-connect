// src/graphql/types/rating.type.ts
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { UserForRating } from './user-for-rating.type'; // Import the new type
import { Recipe } from './recipe.type'; // Assuming this is the correct path

@ObjectType()
export class Rating {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  value: number;

  @Field(() => UserForRating) // Use the simplified type here
  user: UserForRating;

  @Field(() => Recipe)
  recipe: Recipe;
}