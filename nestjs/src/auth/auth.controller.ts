import {
  Controller,
  Post,
  UseGuards,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CurrentUser } from '../common/decorators/auth-user.decorator';
import { AuthUser } from './types/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiBody({
    type: LoginAuthDto,
    description: 'Учетные данные пользователя',
  })
  login(@CurrentUser() user: AuthUser) {
    if (user === undefined) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Профиль текущего пользователя' })
  @ApiBearerAuth()
  getProfile(@CurrentUser() user: AuthUser) {
    return user;
  }
}
