import { IsArray, IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Name khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'Description khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'isActive khong duoc de trong' })
  @IsBoolean({ message: 'isActive phai la boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'permissions khong duoc de trong' })
  @IsMongoId({ each: true, message: 'permissions is mongo Id' })
  @IsArray({ message: 'permissions phai la array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
