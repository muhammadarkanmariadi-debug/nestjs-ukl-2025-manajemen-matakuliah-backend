import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UseGuards, Req, UsePipes, ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from '@nestjs/common';
import { access } from 'fs';
import { LocalStrategy } from 'helper/passport/local.startegy';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      const data = await this.authService.login(createAuthDto);
      return data
    } catch (error) {
      console.error("🔥 Auth Login Error:", error);
      return {
        status: 401,
        message: 'Login failed',
        error: error.message,
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: any) {
    try {
      console.log(req)


      return {
        status: 200,
        message: 'Profile retrieved successfully',
        data: req.user,
      };
    } catch (error) {
      console.error("🔥 Auth Profile Error:", error);
      return {
        status: 500,
        message: 'Failed to retrieve profile',
        error: error.message,
      };
    }
  }
}
