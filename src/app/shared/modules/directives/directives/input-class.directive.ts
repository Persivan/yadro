import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: 'input'
})
export class InputClassDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // Метрика яндекса
    this.renderer.addClass(this.el.nativeElement, 'ym-record-keys');
  }
}
