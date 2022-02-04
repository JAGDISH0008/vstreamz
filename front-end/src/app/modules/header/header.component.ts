import { Utils } from '../../utils/util';
import { environment } from '../../../environments/environment';
import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AppService } from "../../services";
declare const window: any;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  public displayStyle = "none";

  public loading = false;
  public utils = new Utils();

  constructor(
    public appService: AppService,
    private toastr: ToastrService
  ) {
  }
  async connectWallet() {
    if (this.appService.network?.chainId != environment.chainId) {
      this.toastr.info('Please switch to Polygon Mumbai test network');
      return;
    }
    this.loading = true;
    try {
      await window.ethereum.enable();
      this.fetchDetails();
      this.loading = false;
      this.toastr.success("Connected to Metamask");
    } catch (error) {
      this.loading = false;
      this.toastr.error("Error connecting to Metamask");

    }
  }
  fetchDetails() {
    this.loading = true;
    this.appService.getWalletDetails().then(() => {
      if (this.appService.network?.chainId != environment.chainId) {
        this.toastr.info('Please switch to Polygon Mumbai test network');
      }
      this.loading = false;
    });
  }
  openPopup() { this.displayStyle = "block"; }
  closePopup() { this.displayStyle = "none"; }
  OnSubmit($event: any) {
    console.log($event);
  }

}