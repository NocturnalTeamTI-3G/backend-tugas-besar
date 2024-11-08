import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
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

  // API to get role by id
  @Get('/:roleId')
  @HttpCode(200)
  async getRoleById(@Param('roleId', ParseIntPipe) roleId: number) {
    const role = await this.roleService.getRoleById(roleId);

    return {
      data: role,
    };
  }
}
