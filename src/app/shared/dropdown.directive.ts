import { Directive, ElementRef, EventEmitter, HostListener, Renderer2, HostBinding, Output } from '@angular/core';

// add css class when it is clicked, remo

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.show') isOpen = false;
  @Output('showDropdown') dropdown = new EventEmitter<boolean>();
  
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    this.dropdown.emit(true);
  }
}
