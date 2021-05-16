import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  @Input('appParallax') imgEl: any;
  private moveImg: number;
  private scaleImg: number;

  constructor(private renderer: Renderer2, private domCtrl: DomController) {
  }

  @HostListener('ionScroll', ['$event']) onContentScroll(ev: any) {
    const scrollTop = ev.detail.scrollTop;

    if (scrollTop > 0) {
      this.moveImg = scrollTop / 1.6;
      this.scaleImg = 1;
    } else {
      this.scaleImg = -scrollTop / 200 + 1;
      this.moveImg = scrollTop / 1.6;
    }

    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.imgEl, 'webkitTransform',
        'translate3d(0,' + this.moveImg + 'px,0) scale(' + this.scaleImg + ',' + this.scaleImg + ')'
      );
    });
  }
}
