import { Controller } from '@nestjs/common';
import { CashTrackingService } from './CashTracking.service';

@Controller('api/v1/CashTracking')
export class CashTrackingController {
  constructor(public CashTrackingService: CashTrackingService) {}
}
