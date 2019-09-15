import { WeatherDay } from '../models/WeatherDay';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class DataStorageService {

    private favorites : WeatherDay[] = [];

    constructor() {}

    add(weatherDay : WeatherDay) {
        const found = this.find(weatherDay);
        if(!found) {
            this.favorites.push(weatherDay);
        }
    }

    remove(weatherDay : WeatherDay) {
        const indexOf = this.favorites.findIndex((item) => {
            return weatherDay.city === item.city 
        });
        if(!(indexOf == -1)){
            this.favorites.splice(indexOf,1);
        }
        console.log(this.favorites);
    }

    find(weatherDay : WeatherDay) {
        const found = this.favorites.some((item) => {
            return weatherDay.city === item.city 
        });
        return found;
    }

    getFavorites() {
        return [...this.favorites];
    }
}