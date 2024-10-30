import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SpecificationsNodeController } from './SpecificationsNode.controller';
import { SpecificationsNode } from './DB/SpecificationsNode.entity';
import { SpecificationsNodeService } from './SpecificationsNode.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecificationsNode])],
  controllers: [SpecificationsNodeController],
  providers: [SpecificationsNodeService],
  exports: [SpecificationsNodeService, TypeOrmModule],
})
export class SpecificationsNodeModule {}
