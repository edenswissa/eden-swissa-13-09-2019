import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/dataStorage.service';
import { WeatherDay } from '../models/WeatherDay';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  favorites: WeatherDay[] = [];

  constructor(private dataStorageService: DataStorageService) {
    this.favorites = this.dataStorageService.getFavorites();
  }

  ngOnInit() {
  }

}
