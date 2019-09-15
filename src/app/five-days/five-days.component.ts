import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../services/weatherApi.service';
import { WeatherDay } from '../models/WeatherDay';
import { DataStorageService } from '../services/dataStorage.service';

@Component({
  selector: 'app-five-days',
  templateUrl: './five-days.component.html',
  styleUrls: ['./five-days.component.scss']
})
export class FiveDaysComponent implements OnInit {

  currentDay : WeatherDay;
  weekWeather : WeatherDay[];
  heartIcon : string = 'far fa-heart fa-3x favIcon black';
  isFavorite : boolean = false;

  constructor(private weatherApiService: WeatherApiService,
              private dataStorageService: DataStorageService) {
    this.currentDay = this.weatherApiService.getCurrentDay();
    if(dataStorageService.find(this.currentDay)) {
      this.fullHeartIcon();
      this.isFavorite = true;
    }
    this.weekWeather = weatherApiService.getWeek();
   }

  ngOnInit() {

  }

  emptyHeartIcon() {
    if(!this.isFavorite) {
      this.heartIcon ='far fa-heart fa-3x favIcon black'
    }
  }

  fullHeartIcon() {
    if(!this.isFavorite) {
      this.heartIcon = 'fas fa-heart fa-3x  favIcon red';
    }
  }

  onFavoriteClick() {
    this.fullHeartIcon();
    this.isFavorite = !this.isFavorite;
    if(this.isFavorite) {
      this.dataStorageService.add(this.currentDay);
    } else {
      this.dataStorageService.remove(this.currentDay);
    }
  }



}
