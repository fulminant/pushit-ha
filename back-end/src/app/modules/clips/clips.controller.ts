import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { ClipsService } from './clips.service';

@Controller('clips')
@UseInterceptors(CacheInterceptor)
export class ClipsController {
  constructor(private readonly clipsService: ClipsService) {}

  @Get()
  getClips(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
  ) {
    return this.clipsService.getClips(page, limit, sortBy, sortDirection);
  }

  @Get(':clipId')
  getClip(@Param('clipId') clipId: number) {
    return this.clipsService.getClip(clipId);
  }
}
