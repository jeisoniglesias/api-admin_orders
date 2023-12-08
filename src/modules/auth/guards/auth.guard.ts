import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Resp } from 'src/utils';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
    private configService: ConfigService,
  ) {}
  public JWT_SECRET = this.configService.get<string>('jwt.secret');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      Resp.Error('UNAUTHORIZED', 'There is no token in the request');
    }

    try {
      const payload = await this.jwtService.verifyAsync<IJwtPayload>(token, {
        secret: this.JWT_SECRET,
      });

      const user = await this.usersService.findUserById(payload.id);

      if (!user) Resp.Error('NOT_FOUND', 'User not found');
      if (!user.isActive) Resp.Error('UNAUTHORIZED', 'User is not active');
      if (user.isBlocked) {
        Resp.Error(
          'UNAUTHORIZED',
          'The user is blocked, can not access, contact an administrator if it is an error.',
        );
      }

      request['user'] = user;
    } catch (error) {
      Resp.Error('UNAUTHORIZED');
    }

    return true;
  }

  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
