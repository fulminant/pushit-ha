import { IClip } from './clip.model';

export interface IClipResponse {
  totalItems: number,
  totalPages: number,
  page: number,
  limit: number,
  items: IClip[]
}

export interface IGetClipParams {
  page?: number;
  limit?: number;
}
