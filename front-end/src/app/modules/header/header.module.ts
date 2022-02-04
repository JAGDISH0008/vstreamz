import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { UploadVideoComponent } from "../../components";
import { HeaderComponent } from "./header.component";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderComponent,
    UploadVideoComponent
  ],
  providers: [],
  bootstrap: [],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
