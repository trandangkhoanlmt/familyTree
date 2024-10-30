import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecificationsNode } from './DB/SpecificationsNode.entity';
import { SpecificationsNodeType } from './DTO/SpecificationsNode.DTO';
import { Response } from 'express';

@Injectable()
export class SpecificationsNodeService {
  constructor(
    @InjectRepository(SpecificationsNode)
    private SpecificationsNodeRepository: Repository<SpecificationsNode>,
  ) {}

  //===================================================================================> POST all node
  async postAllSpecificationsNode(
    data: SpecificationsNodeType[],
    res: Response,
  ) {
    try {
      this.SpecificationsNodeRepository.create(data);
      await this.SpecificationsNodeRepository.save(data);
      return res.status(200).json({ message: 'Lưu dữ liệu thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Server Error' });
    }
  }
}
