import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  categories = [];
  highlights = [];
  featured = [];
  catSlideOpts: any = {
    freeMode: true,
    slidesPerView: 3.5,
    slidesOffsetBefore: 11,
    spaceBetween: 10,
  };

  highlightsSlideOpts: any = {
    slidesPerView: 1.05,
    spaceBetween: 10,
    centeredSlides: true,
    loop: true,
  };

  featuredSlideOpts: any = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    freeMode: true,
  };
  showLocationDetail     = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json').subscribe((res: any) => {
      this.categories = res.categories;
      this.highlights = res.highlights;
      this.featured = res.featured;
    });
  }

  doRefresh(ev: any) {
    setTimeout(() => {
      ev.target.complate();
    }, 2000);
  }

  onScroll(ev: any) {
    const offset = ev.detail.scrollTop;
    this.showLocationDetail = offset > 50;
  }
}
