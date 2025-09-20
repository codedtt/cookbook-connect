// src/graphql/types/recipe.type.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';
import { Author } from './author.type'; // Corrected import
import { Ingredient } from './ingredient.type'; // Corrected import
import { Instruction } from './instruction.type'; // Corrected import

@ObjectType()
export class Recipe {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  cuisine: string | null;

  @Field(() => String, { nullable: true })
  difficulty: string | null;

  @Field(() => Number, { nullable: true })
  cookingTime: number | null;

  @Field(() => Author)
  author: Author;

  @Field(() => [Ingredient])
  ingredients: Ingredient[];

  @Field(() => [Instruction])
  instructions: Instruction[];
}