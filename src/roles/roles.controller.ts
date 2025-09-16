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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RessponseMessage, UserRequest } from 'src/auth/decorator/customize';
import { IUser } from 'src/users/user.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @RessponseMessage('Tạo role mới thành công')
  async create(
    @Body() createRoleDto: CreateRoleDto,
    @UserRequest() user: IUser,
  ) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  @RessponseMessage('Lấy danh sách role thành công')
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.rolesService.findAll(+currentPage, +limit, qs);
  }

  @Get(':id')
  @RessponseMessage('Lấy role theo id thành công')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @RessponseMessage('Cập nhật role thành công')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto, @UserRequest() user : IUser) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @RessponseMessage('Xóa role thành công')
  remove(@Param('id') id: string, @UserRequest() user : IUser) {
    return this.rolesService.remove(id, user);
  }
}
