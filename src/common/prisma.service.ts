import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, string>
  implements OnModuleInit
{
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });
  }

  // This method will be called when the module is initialized
  // and will listen for Prisma events
  onModuleInit() {
    this.$on('info', (e) => {
      this.logger.info(e);
    });

    this.$on('warn', (e) => {
      this.logger.warn(e);
    });

    this.$on('error', (e) => {
      this.logger.error(e);
    });

    this.$on('query', (e) => {
      this.logger.info(e);
    });
  }
}
