import { Body, Controller, Post, Res } from '@nestjs/common';
import { SpecificationsEdgeService } from './SpecificationsEdge.service';
import { SpecificationsEdgeType } from './DTO/SpecificationsEdge.DTO';
import { Response } from 'express';

@Controller('api/v1/specificationsEdge')
export class SpecificationsEdgeController {
  constructor(public SpecificationsEdgeService: SpecificationsEdgeService) {}

  //============================================================================> POST all edge
  @Post('/postallEdge')
  async postAllEdge(
    @Body() body: SpecificationsEdgeType[],
    @Res() res: Response,
  ) {
    return await this.SpecificationsEdgeService.postAllSpecificationsEdge(
      body,
      res,
    );
  }

  //  //============================================================================> GET all products
  //  @Get('/getallproducts')
  //  async getAllProduct(@Res() res: Response) {
  //    return await this.ProductService.getAllProduct(res);
  //  }
}
