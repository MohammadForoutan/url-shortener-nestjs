import { HttpModule } from '@app/infra/api';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class UrlShortenerModule {}
