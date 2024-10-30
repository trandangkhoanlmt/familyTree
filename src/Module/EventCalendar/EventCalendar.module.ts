import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './DB/EventCalendar.entity';
import { EventCalendarController } from './EventCalendar.controller';
import { EventCalendarService } from './EventCalendar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventCalendarController],
  providers: [EventCalendarService],
})
export class EventCalendarModule {}
