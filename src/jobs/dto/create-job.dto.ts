import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  Validate,
  ValidateNested,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import mongoose from 'mongoose';

@ValidatorConstraint({ name: 'EndDateAfterStartDate', async: false })
export class EndDateAfterStartDate implements ValidatorConstraintInterface {
  validate(endDate: Date, args: ValidationArguments) {
    const object = args.object as any;
    return endDate > object.startDate;
  }
  defaultMessage(args: ValidationArguments) {
    return 'EndDate phải lớn hơn StartDate';
  }
}

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;
}

export class CreateJobDto {
  @IsNotEmpty({ message: 'Name khong duoc de trong' })
  name: string;

  @IsNotEmpty({ message: 'Skills khong duoc de trong' })
  @IsArray({ message: 'Skills có định dạng là array' })
  @IsString({ each: true, message: 'Skill có định dạng là string' })
  skills: string[];

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'Location khong duoc de trong' })
  location: string;

  @IsNotEmpty({ message: 'Salary khong duoc de trong' })
  salary: number;

  @IsNotEmpty({ message: 'Quantity khong duoc de trong' })
  quantity: number;

  @IsNotEmpty({ message: 'Level khong duoc de trong' })
  level: string;

  @IsNotEmpty({ message: 'Desscription khong duoc de trong' })
  description: string;

  @IsNotEmpty({ message: 'StartDate khong duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate co dinh dang la Date' })
  startDate: Date;

  @IsNotEmpty({ message: 'EndDate khong duoc de trong' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate co dinh dang la Date' })
  @Validate(EndDateAfterStartDate)
  endDate: Date;

  @IsNotEmpty({ message: 'isActive khong duoc de trong' })
  @IsBoolean({ message: 'isActive co dinh dang la boolean' })
  isActive: boolean;
}
