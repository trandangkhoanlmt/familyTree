import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificationsEdge } from './DB/SpecificationsEdge.entity';
import { SpecificationsEdgeType } from './DTO/SpecificationsEdge.DTO';
import { Response } from 'express';

@Injectable()
export class SpecificationsEdgeService {
  constructor(
    @InjectRepository(SpecificationsEdge)
    private SpecificationsEdgeRepository: Repository<SpecificationsEdge>,
  ) {}

  //===================================================================================> POST all node
  async postAllSpecificationsEdge(
    data: SpecificationsEdgeType[],
    res: Response,
  ) {
    try {
      this.SpecificationsEdgeRepository.create(data);
      await this.SpecificationsEdgeRepository.save(data);
      return res.status(200).json({ message: 'Lưu dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
