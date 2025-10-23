import { HttpModule } from '@app/infra/http';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class UrlShortenerModule {}
