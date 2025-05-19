import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { register } from 'swiper/element/bundle';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

register();

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
  standalone: false
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true,
    spaceBetween: 0
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  onClick() {
    this.cargarMas.emit();
  }

  async verDetalle(id: string) {

   const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
