import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Password không được để trống' })
  password: string;

  @IsNotEmpty({ message: 'Name không được để trống ' })
  name: string;

  @IsNotEmpty({ message: 'Address không được để trống' })
  address: string;

  @IsNotEmpty({ message: 'Gender không được dể trống' })
  gender: string;

  @IsNotEmpty({ message: 'Age khong duoc de trong' })
  age: number;

  @IsNotEmpty({ message: 'Role không được để trống' })
  @IsMongoId({ message: 'role is mongo Id' })
  role: mongoose.Schema.Types.ObjectId;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'Email không đúng định dạng' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @IsNotEmpty({ message: 'Password khong duoc de trong' })
  password: string;

  @IsNotEmpty({ message: 'Role khong duoc de trong' })
  role: string;

  @IsNotEmpty({ message: 'Age khong duoc de trong' })
  age: number;

  @IsNotEmpty({ message: 'Gender khong duoc de trong' })
  gender: string;

  @IsNotEmpty({ message: 'Address khong duoc de trong' })
  address: string;
}
