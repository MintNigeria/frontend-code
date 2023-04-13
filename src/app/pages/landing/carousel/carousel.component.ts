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
      header: 'Transcript requests and certificate verification just got better.',
      text: 'VAC is an innovative and user-friendly digital solution that simplifies the process of academic transcript and certificate verification requests as well as facilitating and tracking academic assessment. Our platform ensures a fast and secure end-to-end verification process.',
      buttonOne: 'Apply Now',
      buttonTwo: 'See how it works'
    },
    {
      id: 'slide2',
      image: 'assets/images/main/carousel2.svg',
      header: 'Improving College Readiness  ',
      text: 'With the ease of requesting Transcripts and Certificates, our solution reduces missed opportunities for students and enables end-to-end tracking.',
      buttonOne: 'Get Started',
      buttonTwo: 'Learn more'
    },
    {
      id: 'slide3',
      image: 'assets/images/main/carousel3.svg',
      header: 'Connecting Industry and Organization',
      text: 'Our solution removes the uncertainty from confirming academic credentials. We provide a secure end-to-end verification process and leverage unique data resources.',
      buttonOne: 'Get Started',
      buttonTwo: 'Learn more'
    },
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
