import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import { RoleRequest, RoleResponse } from 'src/model/role.model';
import { Logger } from 'winston';
import { RoleValidation } from './role.validation';

@Injectable()
export class RoleService {
  constructor(
    private validationService: ValidationService,
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
  ) {}

  // API Create new Roles
  async createRole(request: RoleRequest): Promise<RoleResponse> {
    this.logger.info(`Creating a new role: ${JSON.stringify(request)}`);
    const roleRequest: RoleRequest = this.validationService.validate(
      RoleValidation.CREATE,
      request,
    );
    return null;
  }
}
