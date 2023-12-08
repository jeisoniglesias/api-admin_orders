import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configModule } from 'config/config.module';
import { DatabaseModule } from 'config/database.module';
import { ModulesModule } from './modules/modules.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomExceptionFilter, TransformInterceptor } from './interceptors';

@Module({
  imports: [ConfigModule.forRoot(configModule), DatabaseModule, ModulesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {}
