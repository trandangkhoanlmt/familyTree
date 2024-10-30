import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cashtracking } from './DB/CashTracking.entity';
import { CashTrackingController } from './CashTracking.controller';
import { CashTrackingService } from './CashTracking.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cashtracking])],
  controllers: [CashTrackingController],
  providers: [CashTrackingService],
})
export class CashTrackingModule {}
