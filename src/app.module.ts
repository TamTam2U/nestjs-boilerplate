import { Module } from '@nestjs/common';
import { BootstrapTypeormModule } from './database/typeorm.module';
import { BootstrapConfigModule } from './bootstrap/config.module';

@Module({
  imports: [BootstrapTypeormModule, BootstrapConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
