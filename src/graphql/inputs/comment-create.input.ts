import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CommentCreateInput {
  @Field()
  text: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  recipeId: number;
}