import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonList, IonSlides, isPlatform } from '@ionic/angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  @ViewChildren(IonList, { read: ElementRef}) lists: QueryList<ElementRef>;
  @ViewChild(IonContent) content;
  @ViewChild(IonSlides) slides;

  data = null;
  opts: any = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100,
  };
  slidesVisible = false;
  activeCategory = 0;
  listElements = [];

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json').subscribe((res: any) => {
      this.data = res;
      console.log(res);
    });

    const height = isPlatform('ios') ? 44 : 56;
    this.document.documentElement.style.setProperty('--header-position', `calc(env(safe-area-inset-top) + ${height}px)`);
  }

  ngAfterViewInit(): void {
    this.lists.changes.subscribe(() => {
      this.listElements = this.lists.toArray();
    });
  }

  selectCategory(index: number): void {
    const child = this.listElements[index].nativeElement;
    this.content.scrollToPoint(0, child.offsetTop - 120, 1000);
  }

  onScroll(ev: any): void {
    this.slidesVisible = ev.detail.scrollTop > 500;

    for (let i = 0; i < this.listElements.length; i += 1) {
      const el = this.listElements[i].nativeElement;
      if (this.isElementInViewport(el)) {
        this.activeCategory = i;
        this.slides.slideTo(i, 1000);
        break;
      }
    }
  }

  isElementInViewport(el: any): boolean {
    const rec = el.getBoundingClientRect();

    return rec.top >= 0 && rec.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
}
