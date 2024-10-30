import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './DB/Users.entity';
import { UserDTO } from './DTO/Users.DTO';

let refreshTokenArr: any[] = [];
require('dotenv').config();

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  // ===========================================================================> Đăng ký mặc định tài khoản admin
  async initializeAdmin() {
    const existingAdmin = await this.userRepository.findOne({
      where: { email: 'admin@example.com' },
    });
    if (!existingAdmin) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash('123456789', salt);
      const admin = await this.userRepository.create({
        fullname: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 2,
        phoneNumber: '9999999999',
      });
      await this.userRepository.save(admin);
    }
  }

  //============================================================================> đăng ký user
  async registerUser(body: UserDTO, res: Response) {
    try {
      const { fullname, passwords, email } = body;

      const Email = await this.userRepository.findOne({
        where: { email },
      });

      if (Email) {
        return res.status(400).json({ msg: 'Email already exists' });
      } else {
        // trường hợp ko tồn tại thì thực hiện
        const saltRounds = 10; //độ an toàn mã hóa password
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(passwords, salt); //hàm băm password==> mã hóa password
        const newUser = this.userRepository.create({
          ...body,
          password: hashedPassword,
        });
        const user = await this.userRepository.save(newUser);

        return res
          .status(200)
          .json({ msg: 'Register Successfully', user: user });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  //================================================================================================> đăng nhập

  async loginUser(body: UserDTO, res: Response) {
    const { email, passwords } = body;
    try {
      // Kiểm tra username và trả về toàn bộ data
      const user = await this.userRepository.findOne({
        where: { email },
      });

      // Nếu có user thì so sánh password bằng hàm compare
      if (user) {
        // Kiểm tra password nhập vào vs password query từ trong DB
        const myPass = await bcrypt.compare(passwords, user.password);

        // Thêm điều kiện nếu có thì mới thành công và trả dữ liệu
        if (myPass) {
          const accessToken = jwt.sign({ ...user }, process.env.DB_SCERETKEY, {
            expiresIn: '1d',
          }); // Token hết hạn trong vòng 30s , vd thêm : 30d ,30m

          const refreshToken = jwt.sign(
            { ...user },
            process.env.DB_SCERETKEYREFRESH,
            {
              expiresIn: '365d',
            },
          ); // Tạo refreshToken để dự trữ
          refreshTokenArr.push(refreshToken); // push refresh token vào 1 mảng để lưu trữ
          const { password, ...data } = user; //loại bỏ password ra khỏi phần data trả về frontend,destructuring
          res.cookie('refreshToken', refreshToken, {
            //Lưu refreshToken vào cookie khi đăng nhập thành công
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
          });

          return res.status(200).json({
            data,
            accessToken,
          });
          // Sai pass thì trả lỗi sai password
        } else {
          return res.status(401).json({ msg: 'Password Wrong' });
        }
      } else {
        // Nếu sai thì báo lỗi
        return res.status(401).json({ msg: 'Username dont exist' });
      }
    } catch (error) {
      res.status(404).json({ msg: 'not found' });
    }
  }

  //================================================================================================> đăng xuất
  async logoutUser(res: Response, req: Request) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });
    refreshTokenArr = refreshTokenArr.filter(
      (token) => token !== req.cookies.refreshToken,
    );
    return res.status(200).json('Logout successfully');
  }

  //================================================================================================> RefreshToken
  async RefreshToken(res: Response, req: Request) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json('Unauthenticated');
    if (!refreshTokenArr.includes(refreshToken)) {
      return res.status(401).json('Unauthenticated');
    }
    jwt.verify(
      refreshToken,
      process.env.DB_SCERETKEYREFRESH,
      (err: any, user: any) => {
        if (err) {
          return res.status(400).json('refreshToken is not valid');
        }
        const { iat, exp, ...userOther } = user;

        refreshTokenArr = refreshTokenArr.filter(
          (token: string) => token !== refreshToken,
        );
        const newAccessToken = jwt.sign(userOther, process.env.DB_SCERETKEY, {
          expiresIn: '1d',
        });
        const newRefreshToken = jwt.sign(
          userOther,
          process.env.DB_SCERETKEYREFRESH,
          { expiresIn: '365d' },
        );
        refreshTokenArr.push(newRefreshToken);
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
        return res.status(200).json(newAccessToken);
      },
    );
  }
}
