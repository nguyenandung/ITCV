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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Public,
  RessponseMessage,
  UserRequest,
} from 'src/auth/decorator/customize';
import { IUser } from './user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RessponseMessage('Create new user')
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @UserRequest() user: IUser,
  ) {
    let newUser = await this.usersService.create(createUserDto, user);
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }

  @Get()
  @RessponseMessage('Get all users')
  findAll(
    @Query('page') currentPage: string,
    @Query('limit') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @Get(':id')
  @RessponseMessage('Get user by id')
  async findOne(@Param('id') id: string) {
    const foundUser = await this.usersService.findOne(id);
    return foundUser;
  }

  @RessponseMessage('Update user')
  @Patch()
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @UserRequest() user: IUser,
  ) {
    let updatedUser = await this.usersService.update(updateUserDto, user);
    return updatedUser;
  }

  @Delete(':id')
  @RessponseMessage('Delete user')
  remove(@Param('id') id: string, @UserRequest() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
