import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
  @IsNotEmpty({ message: 'Email khong duoc de trong' })
  email: string;

  @IsNotEmpty({ message: 'UserId khong duoc de trong' })
  userId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'Url khong duoc de trong' })
  url: string;

  @IsNotEmpty({ message: 'Status khong duoc de trong' })
  status: string;

  @IsNotEmpty({ message: 'CompanyId khong duoc de trong' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'JobId khong duoc de trong' })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: 'Url khong duoc de trong' })
  url: string;

  @IsNotEmpty({ message: 'companyId khong duoc de trong' })
  @IsMongoId({ message: 'companyId is mongo Id' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobId khong duoc de trong' })
  @IsMongoId({ message: 'jobId is mongo Id' })
  jobId: mongoose.Schema.Types.ObjectId;
}
