import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';


import { ClipsService } from './clips.service';
import { ClipsController } from './clips.controller';
import { ApiConfigService } from '../../api-config.service';

@Module({
  imports: [HttpModule],
  controllers: [ClipsController],
  providers: [ClipsService, ApiConfigService],
})
export class ClipsModule {}
