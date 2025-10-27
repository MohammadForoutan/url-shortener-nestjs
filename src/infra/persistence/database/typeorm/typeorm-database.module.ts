import { UrlRepository } from '@app/application/ports/url.repository';
import { UserRepository } from '@app/application/ports/user.repository';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { envConfig } from '../../../env';
import { UrlEntity } from './entities/url.entity';
import { UserEntity } from './entities/user.entity';
import { TypeormUserRepository } from './repositories';
import { TypeormUrlRepository } from './repositories/typeorm-url.repository';
import { TypeormUnitOfWork } from './unit-of-work';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UrlEntity]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: envConfig.POSTGRES_DB_HOST,
      port: envConfig.POSTGRES_DB_PORT,
      username: envConfig.POSTGRES_DB_USERNAME as string,
      password: envConfig.POSTGRES_DB_PASSWORD as string,
      database: envConfig.POSTGRES_DB_DATABASE as string,
      autoLoadEntities: true,
      synchronize: envConfig.NODE_ENV !== 'production',
      logging: envConfig.NODE_ENV !== 'production',
      connectTimeoutMS: 10000,
      poolSize: 10,
    }),
  ],
  providers: [
    TypeormUnitOfWork,
    {
      provide: UserRepository,
      useClass: TypeormUserRepository,
    },
    {
      provide: UrlRepository,
      useClass: TypeormUrlRepository,
    },
  ],
  exports: [UserRepository, UrlRepository],
})
export class TypeormDatabaseModule {}
