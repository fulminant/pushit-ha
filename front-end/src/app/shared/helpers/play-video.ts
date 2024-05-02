// We need this 'hack' to make sure that video is playing.
export function playVideo(video: HTMLVideoElement): void {
  if (!video) return;

  const promise = video.play();

  if (promise !== undefined) {
    promise.catch(() => {
      video.muted = true;
      video.play();
    });
  }
}
