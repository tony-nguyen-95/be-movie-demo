import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class GetUsersFilterDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
