import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../services/weatherApi.service';
import { WeatherDay } from '../models/WeatherDay';
import { DataStorageService } from '../services/dataStorage.service';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-five-days',
  templateUrl: './five-days.component.html',
  styleUrls: ['./five-days.component.scss'],
  animations: [
    trigger('leftState',[
      state('start',style({
        transform:'translateX(-100%)'
      })),
      state('end',style({
        transform:'translateX(0)'
      })),
      transition('start => end', animate(500)),
    ]),
    trigger('rightState',[
      state('start',style({
        transform:'translateY(-150%)'
      })),
      state('end',style({
        transform:'translateX(0)'
      })),
      transition('start => end', animate(500)),
    ]),
  ]
})
export class FiveDaysComponent implements OnInit {

  currentDay : WeatherDay;
  weekWeather : WeatherDay[];
  heartIcon : string = 'far fa-heart fa-3x favIcon black';
  isFavorite : boolean = false;

  //animations
  leftState = 'start';
  rightState = 'start';

  constructor(private weatherApiService: WeatherApiService,
              private dataStorageService: DataStorageService) {
    this.currentDay = this.weatherApiService.getCurrentDay();
    this.weekWeather = this.weatherApiService.getWeek();
    this.isFavorite = dataStorageService.find(this.currentDay);
    this.changeHeartIcon();
    this.weatherApiService.finishLoading.subscribe((flag) => {
      this.currentDay = this.weatherApiService.getCurrentDay();
      this.weekWeather = this.weatherApiService.getWeek();
      this.isFavorite = this.dataStorageService.find(this.currentDay);
      this.changeHeartIcon();
    })
   }

  ngOnInit() {
    setTimeout(() => { this.onAnimation()});
  }

  onAnimation(){
    this.leftState == 'start' ? this.leftState = 'end' : this.leftState = 'start';
    this.rightState == 'start' ? this.rightState = 'end' : this.rightState = 'start';
  }

  emptyHeartIcon() {
    if(!this.isFavorite) {
      this.heartIcon ='far fa-heart fa-3x favIcon black'
    }
  }

  fullHeartIcon() {
    this.heartIcon = 'fas fa-heart fa-3x  favIcon red';
  }

  changeHeartIcon() {
    if(!this.isFavorite) {
      this.heartIcon ='far fa-heart fa-3x favIcon black'
    }
    else {
      this.heartIcon = 'fas fa-heart fa-3x  favIcon red';
    }
  }

  onFavoriteClick() {
    this.isFavorite = !this.isFavorite;
    this.changeHeartIcon();
    if(this.isFavorite) {
      this.dataStorageService.add(this.currentDay);
    } else {
      this.dataStorageService.remove(this.currentDay);
    }
  }



}
