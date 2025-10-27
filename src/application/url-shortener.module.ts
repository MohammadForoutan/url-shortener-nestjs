import { HttpModule } from '@app/infra/api/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class UrlShortenerModule {}
