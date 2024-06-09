import { Module } from '@nestjs/common';
import { BootstrapTypeormModule } from './database/typeorm.module';
import { BootstrapConfigModule } from './bootstrap/config.module';
import { UserModule } from './Modules/User/user.module';

@Module({
  imports: [BootstrapTypeormModule, BootstrapConfigModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
