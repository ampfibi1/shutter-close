import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AdminModule } from './admin/admin.module.js';
import { CustomerModule } from './customer/customer.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './common/services/cloudinary.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbEnv = config.get<string>('DB_ENV', 'local');
        const databaseUrl = dbEnv === 'neon' ? config.getOrThrow<string>('NEON_DATABASE_URL') : config.getOrThrow<string>('LOCAL_DATABASE_URL');

        if (!databaseUrl) throw new Error(`Database URL is missing for DB_ENV=${dbEnv}`);

        return {
          type: 'postgres',
          url: databaseUrl,
          autoLoadEntities: true,
          synchronize: true, 
          ssl:
            dbEnv === 'neon' ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api',
    }),
    AdminModule, CustomerModule,CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
