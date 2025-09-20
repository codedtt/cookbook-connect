// src/graphql/types/author.type.ts

import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;
}