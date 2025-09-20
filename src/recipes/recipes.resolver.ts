import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { Recipe } from '../graphql/types/recipe.type';
import { RecipesService } from './recipes.service';
import { RecipeCreateInput } from '../graphql/inputs/recipe-create.input';
import { RecipeUpdateInput } from 'src/graphql/inputs/recipe-update.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { AuthorGuard } from 'src/auth/guards/author.guard';

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private recipesService: RecipesService) {}

  @Query(() => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return this.recipesService.findAll();
  }

  @Query(() => Recipe, { nullable: true })
    async recipe(@Args('id', { type: () => Int }) id: number): Promise<Recipe | null> {
    return this.recipesService.findById(id);
  }

  @Mutation(() => Recipe)
  @UseGuards(GqlAuthGuard)
  async createRecipe(
    @Args('input') input: RecipeCreateInput,
    @Context() context,
  ): Promise<Recipe> {
     const user = context.req.user;
    
    // Log the user to see if it's populated correctly
    console.log('Authenticated User:', user); 

    if (!user || !user.id) {
        throw new Error('User not found or ID is missing in the request.');
    }
    return this.recipesService.createRecipe({
            ...input,
            authorId: user.id,
    });
  }

  @Mutation(() => Recipe)
  @UseGuards(GqlAuthGuard, AuthorGuard)
  async updateRecipe(
    @Args('input') input: RecipeUpdateInput,
  ): Promise<Recipe> {
    return this.recipesService.updateRecipe(input);
  }
  
  @Mutation(() => Int)
  @UseGuards(GqlAuthGuard, AuthorGuard) // Apply both guards
  async deleteRecipe(@Args('id', { type: () => Int }) id: number): Promise<number> {
    await this.recipesService.deleteRecipe(id);
    return id;
  }
}   