import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './DB/Members.entity';
import { MemberController } from './Members.controller';
import { MemberService } from './Members.service';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
