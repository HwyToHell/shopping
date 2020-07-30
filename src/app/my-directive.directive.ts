import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[myDirective]'
})
export class MyDirective implements OnInit {
    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = 'red';
    // @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
    @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

    constructor() {}

    ngOnInit() {
        this.backgroundColor = this.defaultColor
    }

    @HostListener('mouseenter') mouseover(eventDate: Event) {
        // hardcoded property, not settable from outside
        // this.backgroundColor = 'red';
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseleave(eventDate: Event) {
        // this.backgroundColor = 'transparent';
        this.backgroundColor = this.defaultColor;
    }
}