import { Module } from '@nestjs/common';
import { BootstrapTypeormModule } from './database/typeorm.module';

@Module({
  imports: [BootstrapTypeormModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
