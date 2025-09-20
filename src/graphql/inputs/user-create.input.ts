// src/graphql/inputs/user-create.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserCreateInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  name: string;
}