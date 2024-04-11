import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ImagenesService } from '../servicios/imagenes.service';


@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent implements OnInit {
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  imagenes: any[] = [];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    // añade cualquier otra configuración que necesites
  };

  constructor(private imagenesService: ImagenesService) {}

  ngOnInit(): void {
    this.imagenesService.getImagesByFamilyAndBrand('Rostro', 'Dermacol').subscribe({
      next: (data) => {
        this.imagenes = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  next() {
    if (this.slickModal) {
      this.slickModal.slickNext();
    }
  }

  prev() {
    if (this.slickModal) {
      this.slickModal.slickPrev();
    }
  }

}
