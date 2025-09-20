// src/auth/guards/author.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const args = ctx.getArgs();

    const recipeId = args.id || args.input.id; // Get the recipe ID from arguments or input

    if (!req.user || !recipeId) {
      return false; // Not authenticated or no recipe ID provided
    }

    // Find the recipe and check ownership
    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { authorId: true }, // Only fetch the authorId for efficiency
    });

    // If the recipe doesn't exist or the user is not the author, deny access
    if (!recipe || recipe.authorId !== req.user.id) {
      throw new ForbiddenException('You are not authorized to perform this action.');
    }

    return true; // The user is authorized
  }
}