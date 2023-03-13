import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  carouselIndex = 0;
  carouselItems = [
    {
      id: 'item1',
      image: 'assets/images/main/Avatar.svg',
      text: '“VAC Solution provided me with a seamless and faster way to get my BSc transcript across to my current institution.”',
      author: 'Damilare Lawson',
      position: 'Msc Student'
    },
    {
      id: 'item2',
      image: 'assets/images/main/Avatar.svg',
      text: '“VAC Solution provided me with a seamless and faster way to get my BSc transcript across to my current institution.”',
      author: 'Damilare Lawson',
      position: 'Msc Student'
    },
    {
      id: 'item3',
      image: 'assets/images/main/Avatar.svg',
      text: '“VAC Solution provided me with a seamless and faster way to get my BSc transcript across to my current institution.”',
      author: 'Damilare Lawson',
      position: 'Msc Student'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  prevSlide() {
    if (this.carouselIndex === 0) {
      this.carouselIndex = this.carouselItems.length - 1;
    } else {
      this.carouselIndex--;
    }
  }

  nextSlide() {
    if (this.carouselIndex === this.carouselItems.length - 1) {
      this.carouselIndex = 0;
    } else {
      this.carouselIndex++;
    }
  }

  setCarouselIndex(index: number) {
    this.carouselIndex = index;
  }

}
