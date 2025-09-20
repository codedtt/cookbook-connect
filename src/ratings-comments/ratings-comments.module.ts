// src/ratings-comments/ratings-comments.module.ts

import { Module } from '@nestjs/common';
import { RatingsCommentsService } from './ratings-comments.service';
import { RatingsCommentsResolver } from './ratings-comments.resolver';
import { PrismaModule } from '../prisma/prisma.module'; // Import the PrismaModule

@Module({
  imports: [PrismaModule], // Add it here
  providers: [RatingsCommentsService, RatingsCommentsResolver],
})
export class RatingsCommentsModule {}