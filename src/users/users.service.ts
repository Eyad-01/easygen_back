import { Injectable, Logger } from '@nestjs/common';
import {
  AuthenticatedRequest,
  UserProfile,
} from './interfaces/user-profile.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  public profile(req: AuthenticatedRequest): {
    message: string;
    user: UserProfile | undefined;
  } {
    this.logger.log(
      `Profile method called. User: ${req.user?.email ?? 'Unknown User'}`,
    );

    return {
      message: 'This is a protected profile endpoint',
      user: req.user,
    };
  }
}
