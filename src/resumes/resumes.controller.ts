import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto, CreateUserCvDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { RessponseMessage, UserRequest } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @RessponseMessage('Create new a resume')
  create(@Body() createUserCvDto: CreateUserCvDto, @UserRequest() user: IUser) {
    return this.resumesService.create(createUserCvDto, user);
  }

  @Get()
  @RessponseMessage('Get all resumes')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.resumesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @RessponseMessage('Get a resume')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne(id);
  }


  @Post("by-user")
  @RessponseMessage('Get resumes by user')
  findByUser(@UserRequest() user: IUser) {
    return this.resumesService.findByUser(user);
  }

  @Patch(':id')
  @RessponseMessage('Update a resume')
  update(
    @Param('id') id: string,
    @Body('status') status: string,
    @UserRequest() user: IUser,
  ) {
    return this.resumesService.update(id, status, user);
  }

  @Delete(':id')
  @RessponseMessage('Delete a resume')
  remove(@Param('id') id: string, @UserRequest() user: IUser) {
    return this.resumesService.remove(id, user);
  }
}
