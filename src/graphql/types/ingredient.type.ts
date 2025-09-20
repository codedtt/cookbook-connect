// src/graphql/types/ingredient.type.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Ingredient {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  quantity: string;
}