import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenealogyTree } from './DB/GenealogyTree.entity';
import { GenealogyTreeController } from './GenealogyTree.controller';
import { GenealogyTreeService } from './GenealogyTree.service';
import { UserModule } from '../Users/Users.module';
import { SpecificationsNodeModule } from '../SpecificationsNode/SpecificationsNode.module';
import { SpecificationsEdgeModule } from '../SpecificationsEdge/SpecificationsEdge.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GenealogyTree]),
    UserModule,
    SpecificationsNodeModule,
    SpecificationsEdgeModule,
  ],
  controllers: [GenealogyTreeController],
  providers: [GenealogyTreeService],
})
export class GenealogyTreeModule {}
