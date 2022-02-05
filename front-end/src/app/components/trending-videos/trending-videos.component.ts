import { VideoService } from './../../services';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { timeStamp } from "console";

@Component({
  selector: "trending-videos",
  templateUrl: "./trending-videos.component.html",
  styleUrls: ["./trending-videos.component.scss"]
})
export class TrendingVideosComponent {
  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;
  loading = false;
  public videos = [];

  constructor(private videoService: VideoService) {
    this.getTrendingVideos();
  }

  playVideo(video: HTMLVideoElement) {
    if (video) video.play();
  }

  pauseVideo(video: HTMLVideoElement) {
    video.pause();
  }

  getTrendingVideos() {
    this.loading = true;
    this.videoService.getMyVideos().then(videos => {
      this.videos = videos[0];
      this.loading = false;
    });
  }
}