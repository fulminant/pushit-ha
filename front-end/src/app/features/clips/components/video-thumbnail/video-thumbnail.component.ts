import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { DatePipe } from '@angular/common';

import { IClip } from '@pushit-ha/lib';

@Component({
  standalone: true,
  imports: [
    DatePipe
  ],
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './video-thumbnail.component.scss'
})
export default class VideoThumbnailComponent {
  @Input() video!: IClip;
}
