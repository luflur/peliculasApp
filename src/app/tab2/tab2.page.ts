import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula[] = [];
  ideas: string[] = ['Spiderman', 'Avengers', 'El señor de los anillos', 'La vida es bella'];

  constructor(
    private moviesServices: MoviesService,
    private modalCtrl: ModalController
  ) { }

  buscar(event: any) {
    const valor = event.detail.value;
    if (valor.lenght === 0) {
      this.buscando = false;
      this.peliculas = [];
      return
    }
    //console.log(valor);
    this.buscando = true;

    this.moviesServices.buscarPeliculas(valor).subscribe((resp: any) => {
      console.log(resp);
      this.peliculas = resp['results'];
      this.buscando = false;
    });
  }

  seleccionarIdea(idea: string) {
    this.textoBuscar = idea;
    this.buscar({ detail: { value: idea } });
  }

  async detalle(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
