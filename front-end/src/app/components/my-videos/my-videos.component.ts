import { Component } from "@angular/core";
import { VideoService } from "../../services";

@Component({
  selector: 'my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss']
})

export class MyVideosComponent {
  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;
  loading = false;
  videos = [];

  constructor(private videoService: VideoService) {
    this.getMyVideos();
  }

  playVideo(video: HTMLVideoElement) {
    if (video) video.play();
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
  }

  getMyVideos() {
    this.loading = true;
    this.videoService.getMyVideos().then(videos => {
      this.videos = videos[0];
      this.loading = false;
    });
  }
}