import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage-angular'
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;

  peliculas: PeliculaDetalle[] = [];

  constructor(
    private toastCtrl: ToastController,
    private storage: Storage
  ) {
    this.init();
    this.cargarFavoritos();
  }

  async init() {
    this._storage = await this.storage.create(); // Crear instancia de storage
  }

  async presentToast(message: string){
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for(const peli of this.peliculas){
      if(peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if(existe){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos.'
    }else{
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos.';
    }

    //this.peliculas.push(pelicula);
    this.presentToast(mensaje);

    if (!this._storage) {
      console.error('Storage no está inicializado');
      return;
    }

    await this._storage.set('peliculas', this.peliculas);

    return !existe;
  }

  // async cargarFavoritos(){

  //   const peliculas = await this._storage?.get('peliculas');
  //   this.peliculas = peliculas || [];
  //   return this.peliculas;

  // }
  async cargarFavoritos() {
  if (!this._storage) {
    await this.init(); // Asegura que esté inicializado
  }

  const peliculas = await this._storage?.get('peliculas');
  this.peliculas = peliculas || [];
  return this.peliculas;
}

  async existePelicula(id: any){
    console.log(id);
    id = Number(id);
    console.log(id);

    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);

    return (existe) ? true: false;
  }
}
