import { Injectable } from "@angular/core";
import { ethers } from "ethers";
import { AppService } from ".";
import { environment } from "../../environments/environment";
import { abi } from "../abi";
declare const window: any;


@Injectable({
  providedIn: "root"
})
export class VideoService {
  constructor(private appService: AppService) { }
  getAllVideos() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.appService.accounts[0]));
    return contract.functions.getAllVideos();
  }

  getMyVideos() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.appService.accounts[0]));
    return contract.functions.getMyUploadedVideos();
  }
  getMyPurchasedVideos() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.appService.accounts[0]));
    return contract.functions.getMyPurchasedVideos();
  }
  findVideoByOwner(owner) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.appService.accounts[0]));
    return contract.functions.findUploadedVideosById(owner);
  }
  buyVideo(id, owner, price) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.appService.accounts[0]));
    return contract.functions.buyVideo(id, owner, { value: ethers.BigNumber.from(price.toString()) });

  }
}