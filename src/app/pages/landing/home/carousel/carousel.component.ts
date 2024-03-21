import { Component, OnInit } from '@angular/core';
import { LoginModalComponent } from '../../modals/login-modal/login-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


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
      header: 'Certificate verification and transcript requests just got better.',
      text: 'The VAC solution is an innovative digital solution that streamlines and automates the process of certificate verification, as well as manage and facilitate transcript requests.',
      buttonOne: 'Request For Demo',
      buttonOneRoute: '/request-demo',
      buttonTwo: 'See how it works',
      buttonTwoRoute: 'explainer'
    },
    {
      id: 'slide2',
      image: 'assets/images/main/carousel2.jpg',
      header: 'Say Goodbye to the Hassle of Manual Certificate Verification Processes.',
      text: 'VAC provides a simple and efficient solution for verifying your academic certificates. Our system is designed to ensure accuracy, speed, and security, making it the go-to platform for certificate verification. Join the VAC community today and elevate your certificate verification experience.',
      buttonOne: 'Request For Demo',
      buttonOneRoute: '/request-demo',
      buttonTwo: 'Learn more',
      buttonTwoRoute: '/verification-services'
    },
    {
      id: 'slide3',
      image: 'assets/images/main/carousel3.jpg',
      header: 'Elevate Your Transcript Request Experience with VAC',
      text: 'Gone are the days of lengthy transcript request processes and manual verification methods. Experience the convenience of VAC for all your transcript needs.',
      buttonOne: 'Request For Demo',
      buttonOneRoute: '/request-demo',
      buttonTwo: 'Learn more',
       buttonTwoRoute: '/transcript-services'
    },
  ];
  selectedCarousel: any;


  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.selectedCarousel = this.carouselItems[0]
  }

   openLogin() {
    const dialogRef = this.dialog.open(LoginModalComponent, {
    });
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

  onButtonClick(route: string) {
  if (route === '/login') {
    this.openLogin();
  } else if (route === 'explainer') {
    this.openExplainer() 
  } else {
    this.router.navigate([route]); 

  }
}

openExplainer() {
  document.getElementById('my-modal-4')?.click()
}

}
