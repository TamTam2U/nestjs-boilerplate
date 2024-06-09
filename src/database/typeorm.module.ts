import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import 'dotenv/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.TYPEORM_HOST || 'localhost',
        port: parseInt(process.env.TYPEORM_PORT) || 3306,
        username: process.env.TYPEORM_USERNAME || 'root',
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.TYPEORM_SYNCHRONIZE === 'false',
        retryAttempts: 3, // Example static value
      }),
    }),
  ],
})
export class BootstrapTypeormModule {}
