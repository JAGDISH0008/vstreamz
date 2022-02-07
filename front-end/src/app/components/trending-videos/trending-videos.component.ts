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
    this.videoService.getAllVideos().then(videos => {
      this.videos = videos[0];
      console.log(this.videos);
      this.loading = false;
    });
  }
  buyVideo(id, owner, price) {
    // console.log(id, owner);
    this.videoService.buyVideo(id, owner, price).then(() => {
      console.log("Video bought");
    }).catch((err) => {
      console.log(err);
    })
  }
}