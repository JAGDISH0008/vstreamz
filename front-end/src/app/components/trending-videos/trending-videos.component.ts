import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { timeStamp } from "console";

@Component({
  selector: "trending-videos",
  templateUrl: "./trending-videos.component.html",
  styleUrls: ["./trending-videos.component.scss"]
})
export class TrendingVideosComponent {
  title = "vstreamz";
  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;

  constructor(){}

  playVideo(video: HTMLVideoElement){
    if (video) video.play();
  }

  pauseVideo(video: HTMLVideoElement){
    video.pause();
  }
 
  videos = [
    {src: 'https://ipfs.io/ipfs/QmfATQNSR2sbFAQwfgycZyzXqYcAT4TXPSeyyMTjekaUR9?fileName=QmfATQNSR2sbFAQwfgycZyzXqYcAT4TXPSeyyMTjekaUR9'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'},
    {src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'}
  ];
}