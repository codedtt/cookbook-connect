import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class RecipeUpdateInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  cuisine?: string;

  @Field({ nullable: true })
  difficulty?: string;

  @Field(() => Int, { nullable: true })
  cookingTime?: number;
}