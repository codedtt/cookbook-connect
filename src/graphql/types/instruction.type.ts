// src/graphql/types/instruction.type.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Instruction {
  @Field(() => ID)
  id: number;

  @Field()
  step: number;

  @Field()
  text: string;
}