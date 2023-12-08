import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LoginDto } from './dto/login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { Resp } from 'src/utils';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { Token } from './entities/token.entity';
import { IAuthResponse } from './types/auth-response.type';
import { BLOCKED_TIME } from 'src/constants/interfaces.entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  private getJwtToken(payload: IJwtPayload) {
    return this.jwtService.sign(payload);
  }
  async login({ email, password }: LoginDto) {
    const user = await this.userService.findUserByEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw Resp.Error('BAD_REQUEST', 'Your password or email are incorrect');
    }
    console.log(user);

    const token = this.getJwtToken({ id: user.id });
    console.log(token);

    const data = {
      token,
      user,
    };
    return Resp.Success<IAuthResponse>(data, 'OK', 'Welcome back 😉');
  }
  async validateUser(id: number): Promise<User> {
    const user = await this.userService.findUserById(id);

    if (!user.isActive) {
      throw Resp.Error(
        'UNAUTHORIZED',
        'The user is inactive, talk to support to try to find a solution',
      );
    }

    if (user.isBlocked) {
      if (user.timeBlocked === BLOCKED_TIME.PERMANENT) {
        throw Resp.Error(
          'UNAUTHORIZED',
          'You cannot access you are permanently banned',
        );
      }

      const now = dayjs().valueOf();
      throw Resp.Error(
        'UNAUTHORIZED',
        `You cannot access you are banned until ${dayjs(
          now + user.timeBlocked,
        ).format('YYYY-MM-DD HH:mm')}`,
      );
    }

    delete user.password;

    return user;
  }

  revalidateToken(user: User) {
    const token = this.getJwtToken({ id: user.id });

    const revalidateUser = {
      token,
      user,
    };
    console.log('revalidateUser');
    console.log(revalidateUser);

    return Resp.Success(revalidateUser, 'OK');
  }
}
