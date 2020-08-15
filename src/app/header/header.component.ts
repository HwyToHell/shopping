import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isDropdown: boolean = false;

  constructor() { }

  onDropdown() {
    this.isDropdown = !this.isDropdown;
    console.log("show dropdown");
  }

}
