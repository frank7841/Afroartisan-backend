import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AdminLoginDto, AdminRegisterDto } from './dto/admin-auth.dto';
import { Public } from './guards/auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Admin Routes
  @Public()
  @Post('admin/login')
  async adminLogin(@Body() loginDto: AdminLoginDto) {
    return this.authService.loginAdmin(loginDto.email, loginDto.password);
  }
  @Public()
  @Post('admin/register')
  async adminRegister(@Body() registerDto: AdminRegisterDto) {
    return this.authService.registerAdmin(registerDto.email, registerDto.password);
  }

  // Google OAuth Routes
  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {
    // Initiates Google OAuth flow
  }
  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const result = await this.authService.loginSocialUser(req.user);
    
    // Redirect to frontend with JWT token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${result.access_token}`);
  }

  // Facebook OAuth Routes
  @Public()
  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) {
    // Initiates Facebook OAuth flow
  }
  @Public()
  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res: Response) {
    const result = await this.authService.loginSocialUser(req.user);
    
    // Redirect to frontend with JWT token
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${result.access_token}`);
  }

  // Protected route example
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req) {
    return req.user;
  }
}