import { Response } from 'express';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { SpecificationsNodeService } from './SpecificationsNode.service';
import { SpecificationsNodeType } from './DTO/SpecificationsNode.DTO';

@Controller('api/v1/specificationsNode')
export class SpecificationsNodeController {
  constructor(public SpecificationsNodeService: SpecificationsNodeService) {}

  //============================================================================> POST all node
  @Post('/postallNode')
  async postAllNode(
    @Body() body: SpecificationsNodeType[],
    @Res() res: Response,
  ) {
    return await this.SpecificationsNodeService.postAllSpecificationsNode(
      body,
      res,
    );
  }
}
