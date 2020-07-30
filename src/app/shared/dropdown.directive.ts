import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from '@angular/core';

// add css class when it is clicked, remo

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.hlt') isOpen = false;
  
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
