// src/graphql/types/recipe.type.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';
import { User } from './user.type'; // Corrected import
import { Ingredient } from './ingredient.type'; // Corrected import
import { Instruction } from './instruction.type'; // Corrected import

@ObjectType()
export class Recipe {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  cuisine: string;

  @Field({ nullable: true })
  difficulty: string;

  @Field({ nullable: true })
  cookingTime: number;

  @Field(() => User)
  author: User;

  @Field(() => [Ingredient])
  ingredients: Ingredient[];

  @Field(() => [Instruction])
  instructions: Instruction[];
}