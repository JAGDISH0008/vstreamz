import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AppService } from './services';
declare const window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = false;

  title = 'vstreamz';
  constructor(
    private toastr: ToastrService,
    private appService: AppService
  ) {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  init() {
    if (typeof window.ethereum == 'undefined') {
      this.toastr.info('Please install Metamask to continue');
    }
    else {
      // this.fetchDetails();
      // this.getFiles();
    }
  }
  async connectWallet() {
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
        this.toastr.info('Please switch to Rinkeby test network');
      }
      this.loading = false;
    });
  }
}
