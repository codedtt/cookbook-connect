// src/graphql/inputs/instruction-create.input.ts

import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class InstructionCreateInput {
  @Field(() => Int)
  step: number;

  @Field()
  text: string;
}