import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { MoviesService } from 'src/app/services/movies.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false
})
export class DetalleComponent  implements OnInit {

  @Input() id: any;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;

  constructor(
    private movieService: MoviesService,
    private modalCtrl: ModalController
  ) { }

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true,
    spacebetween: -5
  }

  ngOnInit() {
    //console.log(this.id)
    this.movieService.getPeliculaDetalle(this.id).subscribe( resp => {
      console.log(resp);
      this.pelicula = resp;
    })

    this.movieService.getActoresPelicula(this.id).subscribe( resp => {
      console.log(resp);
      this.actores = resp.cast;
    })
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito(){

  }

}
