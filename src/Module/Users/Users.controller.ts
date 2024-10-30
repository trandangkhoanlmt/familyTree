import { Request, Response } from 'express';

import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { UserService } from './Users.service';
import { multerUpload } from 'src/Config/Multer.config';
import { UserDTO } from './DTO/Users.DTO';

@Controller('api/v1/user')
export class UserController {
  constructor(public UserService: UserService) {}

  //================================================================================================> đăng ký
  @Post('/register')
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'imageAvartar', maxCount: 1 }],
      multerUpload,
    ),
  )
  async registerUser(
    @UploadedFiles() files: { imageAvartar?: Express.Multer.File[] },
    @Res() res: Response,
    @Body() body: UserDTO,
  ) {
    if (files.imageAvartar) {
      body.imgavatar = files.imageAvartar[0].path;
    }
    return await this.UserService.registerUser(body, res);
  }

  //============================================================================================> đăng nhập
  @Post('/login')
  async loginUser(@Body() body: any, @Res() res: Response) {
    return await this.UserService.loginUser(body, res);
  }

  //============================================================================================> đăng xuất
  @Post('/logout')
  async logoutUser(@Res() res: Response, @Req() req: Request) {
    return await this.UserService.logoutUser(res, req);
  }

  //============================================================================================> refectoken
  @Post('/refreshtoken')
  async RefreshToken(@Res() res: Response, @Req() req: Request) {
    return await this.UserService.RefreshToken(res, req);
  }
}
