import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
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
  estrella = 'star-outline';

  constructor(
    private movieService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService
  ) { }

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true,
    spacebetween: -5
  }

  ngOnInit() {
    //console.log(this.id)

    this.dataLocal.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline');

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

  async favorito(){
    const existe = this.dataLocal.guardarPelicula(this.pelicula)
    this.estrella = (await existe) ? 'star' : 'star-outline';
  }

}
