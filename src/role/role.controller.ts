import { Body, Controller, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleRequest, RoleResponse } from 'src/model/role.model';
import { WebResponse } from 'src/model/web.model';

@Controller('/api/roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  // API to create a new role
  @Post()
  async createRole(
    @Body() request: RoleRequest,
  ): Promise<WebResponse<RoleResponse>> {
    const newRole = await this.roleService.createRole(request);

    return {
      data: newRole,
    };
  }
}
