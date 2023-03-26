import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignUpDto, AuthSignInDto } from './dto';

@ApiTags('Auth Functions')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: AuthSignUpDto })
  @Post('signup')
  signup(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto, 'USER');
  }

  @ApiOperation({ summary: 'Authenticate a user' })
  @ApiBody({ type: AuthSignInDto })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthSignInDto) {
    return this.authService.signin(dto);
  }

  @ApiOperation({ summary: 'Create a new admin user' })
  @ApiBody({ type: AuthSignUpDto })
  @Post('admin')
  signupAdmin(@Body() dto: AuthSignUpDto) {
    return this.authService.signup(dto, 'ADMIN');
  }
}
