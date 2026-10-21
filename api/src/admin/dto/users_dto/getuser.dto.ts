import { UserRole } from "../../../entities/enums/role.enum.js";

export class GetUserDto {
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  coinBalance: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}