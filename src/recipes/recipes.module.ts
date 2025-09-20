// src/recipes/recipes.module.ts

import { Module } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipesResolver } from './recipes.resolver';
import { PrismaModule } from '../prisma/prisma.module'; // Import the PrismaModule

@Module({
  imports: [PrismaModule], // Add it here
  providers: [RecipesService, RecipesResolver],
})
export class RecipesModule {}