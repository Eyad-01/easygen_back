import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { UsersService } from './users.service';
import { AuthenticatedRequest } from './interfaces/user-profile.interface';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOkResponse({
    description: 'Successfully retrieved the user profile',
    schema: {
      example: {
        message: 'This is a protected profile endpoint',
        user: {
          userId: '123456',
          email: 'john@example.com',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. JWT token is invalid or missing',
  })
  getProfile(@Request() req: AuthenticatedRequest) {
    return this.usersService.profile(req);
  }
}
