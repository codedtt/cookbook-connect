import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Rating } from '../graphql/types/rating.type';
import { Comment } from '../graphql/types/comment.type';
import { RatingCreateInput } from '../graphql/inputs/rating-create.input';
import { CommentCreateInput } from '../graphql/inputs/comment-create.input';
import { RatingsCommentsService } from './ratings-comments.service';

@Resolver()
export class RatingsCommentsResolver {
  constructor(private ratingsCommentsService: RatingsCommentsService) {}

  @Mutation(() => Rating)
  async addRating(@Args('input') input: RatingCreateInput): Promise<Rating> {
    return this.ratingsCommentsService.createRating(input);
  }

  @Mutation(() => Comment)
  async addComment(@Args('input') input: CommentCreateInput): Promise<Comment> {
    return this.ratingsCommentsService.createComment(input);
  }
}