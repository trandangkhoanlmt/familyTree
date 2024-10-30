import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  CreateGenealogyTree,
  GenealogyTreePayload,
} from './DTO/CreateGenealogyTree.DTO';
import { Response } from 'express';
import { GenealogyTree } from './DB/GenealogyTree.entity';
import { Users } from '../Users/DB/Users.entity';
import { SpecificationsNode } from '../SpecificationsNode/DB/SpecificationsNode.entity';
import { SpecificationsEdge } from '../SpecificationsEdge/DB/SpecificationsEdge.entity';

@Injectable()
export class GenealogyTreeService {
  constructor(
    @InjectRepository(GenealogyTree)
    private genealogyTreeRepository: Repository<GenealogyTree>,

    @InjectRepository(Users)
    private userRepository: Repository<Users>,

    @InjectRepository(SpecificationsNode)
    private specificationsNodeRepository: Repository<SpecificationsNode>,

    @InjectRepository(SpecificationsEdge)
    private specificationsEdgeRepository: Repository<SpecificationsEdge>,
  ) {}

  // ==================================================================> POST TÊN CÂY GIA PHẢ
  async CreateGenealogyTree(data: CreateGenealogyTree, res: Response) {
    try {
      this.genealogyTreeRepository.create(data);
      const savedGenealogyTree = await this.genealogyTreeRepository.save(data);
      const newId = savedGenealogyTree.id;
      const userId = savedGenealogyTree.id_use;

      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      user.Genealogy_id = newId;
      user.genealogyTree = { id: newId } as GenealogyTree;
      await this.userRepository.save(user);

      return res.status(200).json({ message: 'thành công' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> GET VỀ KIỂM TRA ĐỂ TẠO CÂY GIA PHẢ ADMIN
  async TestGenealogyTree(id: string, res: Response) {
    try {
      const id_use = Number(id);

      const DataGenealogyTree = await this.genealogyTreeRepository.findOne({
        where: { id_use: id_use },
      });
      if (DataGenealogyTree) {
        res.status(200).json({ data: DataGenealogyTree });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  // ==================================================================> GET CÂY GIA PHẢ
  async getGenealogyTreeAll(id: string, res: Response) {
    try {
      const genealogy = Number(id);

      const DataGenealogyTree = await this.genealogyTreeRepository.findOne({
        where: { id: genealogy },
        relations: ['specificationsNode', 'specificationsEdge'],
      });
      if (DataGenealogyTree) {
        res.status(200).json({ data: DataGenealogyTree });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
