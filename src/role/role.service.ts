import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from '../common/prisma.service';
import { ValidationService } from '../common/validation.service';
import { RoleRequest, RoleResponse } from '../model/role.model';
import { Logger } from 'winston';
import { RoleValidation } from './role.validation';

@Injectable()
export class RoleService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // Logic Create new Roles
  async createRole(request: RoleRequest): Promise<RoleResponse> {
    this.logger.info(`Creating a new role: ${JSON.stringify(request)}`);
    const roleRequest: RoleRequest = this.validationService.validate(
      RoleValidation.CREATE,
      request,
    );

    // Create new role in database
    const newRole = await this.prismaService.role.create({
      data: roleRequest,
    });

    return {
      id: newRole.id,
      name: newRole.name,
      created_at: newRole.created_at,
    };
  }
}
