import { Component } from '@angular/core';
export interface Tutorial {
  title?: String;
  image?: String;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  tutorials: Tutorial[]=[];
  responsiveOptions:any=[];
  constructor(){
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 3,
          numScroll: 3
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  ngOnInit() {
    this.tutorials = [
      {
          title: 'Web MH ',
          image:
        'assets/images/img-1.jpg',
      },
      {
          title: 'Interview Experience ',
          image:
          'assets/images/img-2.jpg',
      },
      {
          title: 'GeeksforGeeks Logo ',
          image:
          'assets/images/img-3.jpg',
      },
      {
          title: 'GeeksforGeeks Carnival ',
          image:
          'assets/images/img-4.jpg',
      },
      {
          title: 'Python Course ',
          image:
          'assets/images/img-5.jpg',
      },
  ];
  }
}
