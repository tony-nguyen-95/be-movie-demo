import { UserRole } from '../users/user-role.enum';

export interface JwtPayload {
  userId: string;
  username: string;
  role: UserRole;
  createDate: any;
}
