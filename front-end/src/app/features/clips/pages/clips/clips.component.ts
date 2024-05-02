import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
  ScrollingModule
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  finalize, map,
  mergeMap,
  Observable,
  scan,
  Subject,
  takeUntil,
  tap,
  throttleTime
} from 'rxjs';
import { AsyncPipe, DatePipe, NgClass, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import VideoThumbnailComponent from '../../components/video-thumbnail/video-thumbnail.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { IGetClipParams } from '../../../../core/models/clip-response.model';
import VideoComponent from '../../components/video/video.component';
import { playVideo } from '../../../../shared/helpers/play-video';
import { ClipsService } from '../../services/clips.service';
import { IClip } from '../../../../core/models/clip.model';

@Component({
  standalone: true,
  imports: [
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    ScrollingModule,
    LoaderComponent,
    RouterLink,
    NgIf,
    NgClass,
    DatePipe,
    AsyncPipe,
    VideoThumbnailComponent,
    VideoComponent
  ],
  selector: 'app-clips-page',
  templateUrl: './clips.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './clips.component.scss'
})
export default class ClipsComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef;
  public clipId?: string;
  public video?: IClip;

  public loading = false;
  public error = false;
  public pageSize = 10;
  public infinite!: Observable<IClip[]>;

  @ViewChild(CdkVirtualScrollViewport) viewport!: CdkVirtualScrollViewport;

  private theEnd = false;
  private offset = new BehaviorSubject<number>(1);
  private unsubscribe$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private clipsService: ClipsService,
    private cdRef: ChangeDetectorRef,
  ) {
    const batchMap = this.offset.pipe(
      throttleTime(500),
      mergeMap(n => this.getVideos(n)),
      scan((acc, batch) => {
        return { ...acc, ...batch };
      }, {})
    );

    this.infinite = batchMap.pipe(map(v => Object.values(v)));
  }

  ngOnInit(): void {
    const { clipId } = this.activatedRoute.snapshot.params;

    this.clipId = clipId;

    if (this.clipId) {
      this.getVideo({ clipId });
    } else {
      this.getVideo({ page: 1, limit: 1 });
    }
  }

  public scrolledIndexChange(): void {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    // Play video when it appears on the viewport.
    const videos = this.viewport.getElementRef().nativeElement.querySelectorAll('video');

    for (let i = 0; i <= videos.length - 1; i++) {
      playVideo(videos[i]);
    }

    if (end === total) {
      this.offset.next((end / this.pageSize) + 1);
    }
  }

  private getVideos(page: number): Observable<Record<number, IClip>> {
    return this.clipsService.getClips({ page })
      .pipe(
        tap(({totalPages, page}) => {
          this.theEnd = totalPages === page;
        }),
        map(res => res.items),
        map(arr => {
          return arr.reduce((acc: Record<number, IClip>, cur: IClip) => {
            acc[cur.id] = cur;
            return acc;
          }, {});
        }),
      );
  }

  private getVideo(params: IGetClipParams): void {
    this.loading = true;
    this.clipsService.getClips(params)
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError(err => {
          this.error = true;
          throw err;
        }),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      )
      .subscribe(videos => {
        this.video = videos.items[0];
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
