import { UrlRepository } from '@app/application/ports/url.repository';
import { UserRepository } from '@app/application/ports/user.repository';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceOptions } from './data-source';
import { UrlEntity } from './entities/url.entity';
import { UserEntity } from './entities/user.entity';
import { TypeormUserRepository } from './repositories';
import { TypeormUrlRepository } from './repositories/typeorm-url.repository';
import { TypeormUnitOfWork } from './unit-of-work';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UrlEntity]),
    TypeOrmModule.forRoot(dataSourceOptions),
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
