import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ClipsModule } from './modules/clips/clips.module';
import { ApiConfigService } from './api-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CacheModule.register({
      ttl: 60,
      isGlobal: true,
      max: 200,
    }),
    HttpModule,
    ClipsModule
  ],
  controllers: [],
  providers: [
    ApiConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    }
  ],
  exports: [ApiConfigService],
})
export class AppModule {
}
