import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cashtracking } from './DB/CashTracking.entity';

@Injectable()
export class CashTrackingService {
  constructor(
    @InjectRepository(Cashtracking)
    private CashTrackingRepository: Repository<Cashtracking>,
  ) {}
}
