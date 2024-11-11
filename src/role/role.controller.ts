import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleRequest, RoleResponse } from '../model/role.model';
import { WebResponse } from '../model/web.model';

@Controller('/api/roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  // API to create a new role
  @Post()
  @HttpCode(200)
  async createRole(
    @Body() request: RoleRequest,
  ): Promise<WebResponse<RoleResponse>> {
    const newRole = await this.roleService.createRole(request);

    return {
      data: newRole,
    };
  }

  // API to get all roles
  @Get()
  @HttpCode(200)
  async getAllRoles(): Promise<WebResponse<RoleResponse[]>> {
    const roles = await this.roleService.getAllRoles();

    return {
      data: roles,
    };
  }

  // API to get role by id
  @Get('/:roleId')
  @HttpCode(200)
  async getRoleById(@Param('roleId', ParseIntPipe) roleId: number) {
    const role = await this.roleService.getRoleById(roleId);

    return {
      data: role,
    };
  }

  // API to update role by id
  @Patch('/:roleId')
  @HttpCode(200)
  async updateRoleById(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() request: RoleRequest,
  ) {
    const role = await this.roleService.updateRole(roleId, request);

    return {
      data: role,
    };
  }

  // API to delete role by id
  @Delete('/:roleId')
  @HttpCode(200)
  async deleteRoleById(@Param('roleId', ParseIntPipe) roleId: number) {
    await this.roleService.deleteRole(roleId);

    return {
      message: true,
    };
  }
}
