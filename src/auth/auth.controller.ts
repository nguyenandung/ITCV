import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, RessponseMessage, UserRequest } from './decorator/customize';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/user.interface';
import { RolesService } from 'src/roles/roles.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private rolesService: RolesService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @RessponseMessage('Login user')
  handleLogin(@Req() req, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(req.user, response);
  }

  @Public()
  @RessponseMessage('Register a new user')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @RessponseMessage('Get user information')
  @Get('/account')
  async handleGetAccount(@UserRequest() user: IUser) {
    const temp = (await this.rolesService.findOne(user.role._id)) as any;
    user.permissions = temp.permissions;
    return { user };
  }

  @Public()
  @RessponseMessage('Refresh token')
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }

  @RessponseMessage('Logout user')
  @Post('/logout')
  handleLogout(
    @Res({ passthrough: true }) response: Response,
    @UserRequest() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}
