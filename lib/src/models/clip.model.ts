export interface IClip {
  id: number;
  displayText: null | string;
  offensive: boolean,
  clipCreationTime: Date;
  fileName: string;
  hasOverlay: boolean;
  hasThumbnail: boolean;
  sessionId: number;
  url: string;
  thumbnail: string;
}
