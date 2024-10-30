import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './DB/EventCalendar.entity';

@Injectable()
export class EventCalendarService {
  constructor(
    @InjectRepository(Event) private EventRepository: Repository<Event>,
  ) {}
}
