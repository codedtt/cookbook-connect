// src/graphql/inputs/recipe-create.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';
import { IngredientCreateInput } from './ingredient-create.input';
import { InstructionCreateInput } from './instruction-create.input';

@InputType()
export class RecipeCreateInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  cuisine: string;

  @Field({ nullable: true })
  difficulty: string;

  @Field(() => Int, { nullable: true })
  cookingTime: number;

  @Field(() => Int)
  authorId: number;

  @Field(() => [IngredientCreateInput])
  ingredients: IngredientCreateInput[];

  @Field(() => [InstructionCreateInput])
  instructions: InstructionCreateInput[];
}