// src/app.module.ts

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RecipeResolver } from './graphql/resolvers/recipe.resolver'; 
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { RatingsCommentsModule } from './ratings-comments/ratings-comments.module'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    UsersModule,
    RecipesModule,
    RatingsCommentsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, RecipeResolver],
})
export class AppModule {}