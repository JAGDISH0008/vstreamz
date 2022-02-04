import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vstreamz';
  constructor(private toastr: ToastrService) {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
