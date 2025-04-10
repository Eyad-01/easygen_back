import { Request } from 'express';

export interface UserProfile {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: UserProfile;
}
