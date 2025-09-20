// src/graphql/inputs/ingredient-create.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class IngredientCreateInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  quantity: string;
}