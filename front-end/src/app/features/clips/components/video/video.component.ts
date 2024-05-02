import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, ElementRef,
  Input, ViewChild
} from '@angular/core';
import { NgClass } from '@angular/common';

import { playVideo } from '../../../../shared/helpers/play-video';
import { IClip } from '@pushit-ha/lib';

@Component({
  standalone: true,
  imports: [
    NgClass
  ],
  selector: 'app-video',
  templateUrl: './video.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VideoComponent implements AfterViewInit {
  @Input() video!: IClip;
  @Input() isFullScreen = true;
  @ViewChild('videoElement') videoElement!: ElementRef;

  ngAfterViewInit(): void {
    playVideo(this.videoElement.nativeElement);
  }
}
