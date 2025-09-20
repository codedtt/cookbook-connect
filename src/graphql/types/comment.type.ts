import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from './author.type';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number;

  @Field()
  text: string;

  @Field()
  createdAt: Date;

  @Field(() => Author)
  user: Author;
}