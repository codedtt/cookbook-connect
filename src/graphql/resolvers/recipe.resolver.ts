// src/graphql/resolvers/recipe.resolver.ts

import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Recipe } from '../types/recipe.type';
import { PrismaService } from '../../prisma/prisma.service';
import { RecipeCreateInput } from '../inputs/recipe-create.input';

@Resolver(() => Recipe)
export class RecipeResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  @Mutation(() => Recipe)
  async createRecipe(
    @Args('input') input: RecipeCreateInput,
  ): Promise<Recipe> {
    const { authorId, ingredients, instructions, ...data } = input;
    return this.prisma.recipe.create({
      data: {
        ...data,
        author: { connect: { id: authorId } },
        ingredients: { create: ingredients },
        instructions: { create: instructions },
      },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }
}