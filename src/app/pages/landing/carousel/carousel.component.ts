import { Component, OnInit } from '@angular/core';
import SwiperCore, { Navigation, Pagination } from 'swiper';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  carouselIndex = 0;
  carouselItems = [
    {
      id: 'slide1',
      image: 'assets/images/main/carousel-1.jpg',
      text: '“VAC Solution provided me with a seamless and faster way to get my BSc transcript across to my current institution.”',
      author: 'Damilare Lawson',
      position: 'Msc Student'
    },
    {
      id: 'slide2',
      image: 'assets/images/main/Avatar.svg',
      text: '“VAC Solution provided me with a seamless and faster way to get my BSc transcript across to my current institution.”',
      author: 'Damilare Lawson',
      position: 'Msc Student'
    },
    // {
    //   id: 'item3',
    //   image: 'assets/images/main/Avatar.svg',
    //   text: '“VAC Solution provided me with a seamless and faster way to get my BSc transcript across to my current institution.”',
    //   author: 'Damilare Lawson',
    //   position: 'Msc Student'
    // },
  ];
  selectedCarousel: any;


  constructor() { }

  ngOnInit(): void {
    this.selectedCarousel = this.carouselItems[0]
  }

  prevSlide() {
    if (this.carouselIndex === 0) {
      this.carouselIndex = this.carouselItems.length - 1;
    } else {
      this.carouselIndex--;
      this.selectedCarousel = this.carouselItems[this.carouselIndex]
    }
  }

  nextSlide() {

    if (this.carouselIndex === this.carouselItems.length - 1) {
      this.carouselIndex = 0;
    } else {
      this.carouselIndex++;
      this.selectedCarousel = this.carouselItems[this.carouselIndex]
    }
  }

  setCarouselIndex(index: number) {
    this.carouselIndex = index;
  }

}
