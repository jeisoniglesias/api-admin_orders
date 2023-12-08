import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginInput: LoginDto) {
    console.log(loginInput);

    return this.authService.login(loginInput);
  }

  @Get('revalidate')
  @UseGuards(/* JwtAuthGuard, */ AuthGuard)
  async revalidateToken(@CurrentUser() user: User) {
    const result = this.authService.revalidateToken(user);
    return result;
  }
}
