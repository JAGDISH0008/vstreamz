import { AppService, IpfsService } from './../../services';
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
declare const window: any;
import { Buffer } from 'buffer';

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
  public trailerBuffer: any;

  public uploadVideoForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    budget: new FormControl("", [Validators.required])
  })

  constructor(
    public appService: AppService,
    public ipfsService: IpfsService,
    public toastr: ToastrService
  ) { }
  submit() {
    this.onSubmit.emit(this.uploadVideoForm.value);
    this.upload();
    this.uploadVideoForm.reset();

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
        else if (type == 'trailer') {
          this.trailerBuffer = Buffer.from(reader.result);
        }
      }
    }
  }
  async upload() {
    // this.fetchDetails();
    if (this.appService.network?.name == 'maticmum') {
      let ipfsData = await this.ipfsService.upload(this.teaserBuffer);
      console.log(ipfsData);
      this.toastr.success("File uploaded successfully to IPFS");
      // this.appService.uploadToContract(ipfsData.cid.toString(), 'test.txt', ipfsData.size, 'text/plain', this.description).then(data => {
      //   this.toastrService.success("Saved Hash to contract");
      // }).catch(err => {
      //   this.toastrService.error("Error saving hash to contract");
      // }).finally(() => {
      // })
    }
  }


}