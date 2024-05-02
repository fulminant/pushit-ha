import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IClipResponse, IGetClipParams } from '../../../core/models/clip-response.model';
import { environment } from '../../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ClipsService {
  constructor(private http: HttpClient) {
  }

  public getClips(params: IGetClipParams): Observable<IClipResponse> {
    return this.http.get<IClipResponse>(`${environment.api}/clips`, { params: { ...params } })
  }

  public getClip(clipId: number): Observable<IClipResponse> {
    return this.http.get<IClipResponse>(`${environment.api}/clips/${clipId}`)
  }
}
