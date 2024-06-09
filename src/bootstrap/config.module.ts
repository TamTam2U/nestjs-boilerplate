import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import configs from '@root/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configs],
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
      expandVariables: true,
    }),
  ],
})
export class BootstrapConfigModule {}
