import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula, RespuestaMDB } from '../interfaces/interfaces';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{

  peliculasRecientes: Pelicula[] = [];

  slideOpts = {
    slidesPerView: 1.2,
    freeMode: true
  }

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getFeature().subscribe( resp => {
      console.log('Resp', resp);
      this.peliculasRecientes = resp.results;
    });
  }

}
