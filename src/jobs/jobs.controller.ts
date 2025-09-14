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
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { RessponseMessage, UserRequest } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @RessponseMessage('Create a new job')
  create(@Body() createJobDto: CreateJobDto, @UserRequest() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @RessponseMessage('Get all jobs')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.jobsService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @RessponseMessage('Get a job by id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @RessponseMessage('Updatr a job by id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @UserRequest() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @RessponseMessage('Delete a job by id')
  remove(@Param('id') id: string, @UserRequest() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
