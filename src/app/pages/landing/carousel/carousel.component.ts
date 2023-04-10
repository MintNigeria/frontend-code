import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  carouselItems = [
    {
      imagePath: 'src/assets/images/icons/carousel.jpg',
      title: 'Slide 1 Title',
      description: 'This is a sample description for slide 1.',
    },
    {
      imagePath: 'src/assets/images/icons/carousel.jpg',
      title: 'Slide 2 Title',
      description: 'This is a sample description for slide 2.',
    },
    {
      imagePath: 'src/assets/images/icons/carousel.jpg',
      title: 'Slide 3 Title',
      description: 'This is a sample description for slide 3.',
    },
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
