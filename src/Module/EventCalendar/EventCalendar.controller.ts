import { Controller } from '@nestjs/common';
import { EventCalendarService } from './EventCalendar.service';

@Controller('api/v1/EventCalendar')
export class EventCalendarController {
  constructor(public EventCalendarService: EventCalendarService) {}
}
