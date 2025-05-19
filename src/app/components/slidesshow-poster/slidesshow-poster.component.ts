import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { register } from 'swiper/element/bundle';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';

register();

@Component({
  selector: 'app-slidesshow-poster',
  templateUrl: './slidesshow-poster.component.html',
  styleUrls: ['./slidesshow-poster.component.scss'],
  standalone: false
})
export class SlidesshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  //Para refrescar favoritos cuando se cierre el modal
  @Output() modalCerrado = new EventEmitter<void>();

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true
  }

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async verDetalle(id: string) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    await modal.present();

    await modal.onWillDismiss();
    this.modalCerrado.emit(); // Le avisa al padre que se cerró
  }
}
