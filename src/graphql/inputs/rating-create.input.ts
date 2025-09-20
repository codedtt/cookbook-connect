import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RatingCreateInput {
  @Field(() => Int)
  value: number;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  recipeId: number;
}