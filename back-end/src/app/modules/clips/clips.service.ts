import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { IClipResponse } from '@pushit-ha/lib';
import { ApiConfigService } from '../../api-config.service';

@Injectable()
export class ClipsService {
  private apiConfig = this.apiConfigService.pushitApiConfig;

  constructor(
    private readonly httpService: HttpService,
    private readonly apiConfigService: ApiConfigService
  ) {
  }

  getClips(page = 1, limit = 10, sortBy = 'date', sortDirection = 'desc'): Observable<AxiosResponse<IClipResponse>> {
    console.log(sortBy, 'ss');
    return this.httpService.get(`${this.apiConfig.apiUrl}/clips`, {
      params: {
        page,
        limit,
        sortBy,
        sortDirection,
        sessionId: this.apiConfig.sessionId,
      }
    })
      .pipe(map(({ data }) => data));
  }

  getClip(clipId: number): Observable<AxiosResponse<IClipResponse>> {
    return this.httpService.get(`${this.apiConfig.apiUrl}/clips`, {
      params: {
        clipId,
        sessionId: this.apiConfig.sessionId,
      }
    })
      .pipe(map(({ data }) => data));
  }
}
