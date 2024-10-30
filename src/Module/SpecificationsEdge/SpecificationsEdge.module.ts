import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecificationsEdge } from './DB/SpecificationsEdge.entity';
import { SpecificationsEdgeService } from './SpecificationsEdge.service';
import { SpecificationsEdgeController } from './SpecificationsEdge.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificationsEdge])],
  controllers: [SpecificationsEdgeController],
  providers: [SpecificationsEdgeService],
  exports: [SpecificationsEdgeService, TypeOrmModule],
})
export class SpecificationsEdgeModule {}
