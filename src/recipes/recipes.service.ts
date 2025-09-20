import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RecipeCreateInput } from '../graphql/inputs/recipe-create.input';
import { RecipeUpdateInput } from 'src/graphql/inputs/recipe-update.input';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  async createRecipe(input: RecipeCreateInput) {
    const { authorId, ingredients, instructions, ...data } = input;
    
    // Use Prisma's nested writes to create a Recipe along with its Ingredients and Instructions
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

  async findAll() {
    return this.prisma.recipe.findMany({
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

   async updateRecipe(input: RecipeUpdateInput) {
    const { id, ...data } = input;
    return this.prisma.recipe.update({
      where: { id },
      data,
      include: {
        author: true,
        ingredients: true,
        instructions: true,
      },
    });
  }

  async deleteRecipe(id: number) {
  // Use a transaction to ensure both operations succeed or fail together
    return this.prisma.$transaction(async (prisma) => {
        // 1. Delete all ingredients associated with the recipe
        await prisma.ingredient.deleteMany({
        where: { recipeId: id },
        });

        // 2. Delete all instructions associated with the recipe
        await prisma.instruction.deleteMany({
        where: { recipeId: id },
        });

        // 3. Delete the recipe itself
        return prisma.recipe.delete({
        where: { id },  
        });
    });
    }

}