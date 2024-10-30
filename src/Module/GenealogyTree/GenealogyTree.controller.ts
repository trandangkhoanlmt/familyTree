import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { GenealogyTreeService } from './GenealogyTree.service';
import {
  CreateGenealogyTree,
  GenealogyTreePayload,
} from './DTO/CreateGenealogyTree.DTO';
import { Response } from 'express';

@Controller('api/v1/GenealogyTree')
export class GenealogyTreeController {
  constructor(public GenealogyTreeService: GenealogyTreeService) {}

  // ======================================================================> POST TÊN CÂY GIA PHẢ
  @Post('/postNameGenealogyTree')
  async createGenealogyTree(
    @Body() body: CreateGenealogyTree,
    @Res() res: Response,
  ) {
    return await this.GenealogyTreeService.CreateGenealogyTree(body, res);
  }

  // ======================================================================> GET VỀ KIỂM TRA ĐỂ TẠO CÂY GIA PHẢ ADMIN
  @Get('/getGenealogyTree/:id')
  async TestGenealogyTree(@Param('id') id: string, @Res() res: Response) {
    return await this.GenealogyTreeService.TestGenealogyTree(id, res);
  }

  // ======================================================================> GET DỮ LIỆU CÂY GIA PHẢ
  @Get('/getGenealogyTreeAll/:id')
  async getGenealogyTreeAll(@Param('id') id: string, @Res() res: Response) {
    return await this.GenealogyTreeService.getGenealogyTreeAll(id, res);
  }
}
