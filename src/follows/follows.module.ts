// src/follows/follows.module.ts

import { Module } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { FollowsResolver } from './follows.resolver';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [], // You can leave this empty for now
  providers: [FollowsResolver, FollowsService, PrismaService],
  exports: [FollowsService],
})
export class FollowsModule {}