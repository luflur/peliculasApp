import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RespuestaMDB } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }

  getFeature() {

    return this.http.get<RespuestaMDB>('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2025-04-01&primary_release_date.lte=2025-05-10&language=es&include_image_language=es&api_key=877733edf2d15b36647d68d63b46ae91');
  }
}
