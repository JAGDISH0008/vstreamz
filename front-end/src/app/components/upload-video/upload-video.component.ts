import { AppService, IpfsService } from './../../services';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
declare const window: any;
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import { environment } from '../../../environments/environment';
import { abi } from '../../abi';

@Component({
  selector: "upload-video-card",
  templateUrl: "./upload-video.component.html",
  styleUrls: ["./upload-video.component.scss"]
})
export class UploadVideoComponent {
  @Output() onCancel = new EventEmitter<any>()
  @Output() onSubmit = new EventEmitter<any>();
  @Input() displayStyle: string = 'none';
  public teaserBuffer: any;
  public videoBuffer: any;

  public uploadVideoForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    budget: new FormControl("", [Validators.required])
  })

  constructor(
    public appService: AppService,
    public ipfsService: IpfsService,
    public toastr: ToastrService
  ) {
  }
  submit() {
    console.log(this.uploadVideoForm.value);
    this.onSubmit.emit(this.uploadVideoForm.value);
    this.upload().then(() => {
      this.uploadVideoForm.reset();

    });

  }
  cancel() {
    this.uploadVideoForm.reset();
    this.onCancel.emit();
  }
  async handleFileInput(event: any, type: string) {
    let files = event.target.files;
    const reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = (e) => {
      if (reader.result) {
        if (type == 'teaser') {
          this.teaserBuffer = Buffer.from(reader.result);
        }
        else if (type == 'video') {
          this.videoBuffer = Buffer.from(reader.result);
        }
      }
    }
  }
  async upload() {
    if (this.appService.network?.name == 'maticmum') {
      let ipfsteaserData = await this.ipfsService.upload(this.teaserBuffer);
      let ipfsvideoData = await this.ipfsService.upload(this.videoBuffer);
      this.toastr.success("File uploaded successfully to IPFS");
      let provider = new ethers.providers.Web3Provider(window.ethereum);
      let signer = provider.getSigner(this.appService.accounts[0]);
      let contract = new ethers.Contract(environment.address, abi.abi, signer);
      this.uploadToContract(ipfsteaserData.cid.toString(), ipfsvideoData.cid.toString(), this.uploadVideoForm.get('name').value, this.uploadVideoForm.get('description').value, this.uploadVideoForm.get('budget').value).then(data => {
        this.toastr.success("Saved Hash to contract");
      }).catch(err => {
        console.log(err);
        this.toastr.error("Error saving hash to contract");
      }).finally(async () => {
        await this.getMyVideos();
      })
    }
  }
  uploadToContract(teaser_hash, video_hash, name, description, price) {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let signer = provider.getSigner(this.appService.accounts[0]);
    let contract = new ethers.Contract(environment.address, abi.abi, signer);
    return contract.functions.uploadVideo(teaser_hash, video_hash, name, description, price)
  }

  getMyVideos() {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    let contract = new ethers.Contract(environment.address, abi.abi, provider.getSigner(this.appService.accounts[0]));
    return contract.functions.getMyUploadedVideos();
  }


}