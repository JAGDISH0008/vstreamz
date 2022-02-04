import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

  constructor() { }
  submit() {
    this.onSubmit.emit(this.uploadVideoForm.value);
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
}