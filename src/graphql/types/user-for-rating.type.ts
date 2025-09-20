// src/graphql/types/user-for-rating.type.ts
import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UserForRating {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  name: string;
}