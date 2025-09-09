import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Name không được để trống' })
  name: string;

  @IsNotEmpty({ message: 'Description không được để trống' })
  description: string;

  @IsNotEmpty({ message: 'Address không được spep trống' })
  address: string;
}
