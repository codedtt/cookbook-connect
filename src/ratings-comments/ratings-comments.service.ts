import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RatingCreateInput } from '../graphql/inputs/rating-create.input';
import { CommentCreateInput } from '../graphql/inputs/comment-create.input';

@Injectable()
export class RatingsCommentsService {
  constructor(private prisma: PrismaService) {}

  async createRating(input: RatingCreateInput) {
    return this.prisma.rating.create({
      data: input,
      include: {
        user: true,
        recipe: {
          include: {
            author: true,
            ingredients: true,
            instructions: true,
          },
        },
      },
    });
  }

  async createComment(input: CommentCreateInput) {
    return this.prisma.comment.create({
      data: input,
      include: {
        user: true,
        recipe: true,
      },
    });
  }
}