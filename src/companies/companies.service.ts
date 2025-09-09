import { Inject, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './schemas/company.schema';
import { InjectModel } from '@nestjs/mongoose';
// import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}
  create(createCompanyDto: CreateCompanyDto) {
    return this.companyModel.create({
      ...createCompanyDto,
    });
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  // update(id: number, updateCompanyDto: UpdateCompanyDto) {
  //   return `This action updates a #${id} company`;
  // }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
