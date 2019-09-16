import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { WeatherDay } from '../models/WeatherDay';
import { BehaviorSubject, from } from 'rxjs';
import { MyLocation } from '../models/MyLocation'
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
export class WeatherApiService {
    private week: WeatherDay[] = [] as WeatherDay[];
    private currentDay: WeatherDay = {} as WeatherDay;
    private autoCompleteArr: MyLocation[] = [];
    private errorMessage : string;

    finishLoading = new BehaviorSubject<Boolean>(false);
    autoCompleteFinishLoading = new BehaviorSubject<Boolean>(false);
    httpError = new BehaviorSubject<boolean>(false);


    constructor(private http: HttpClient) {

    }

    autoComplete(text: string) {
        this.autoCompleteArr = [];
        if (text) {
            const url: string = environment.weatherApi + 'locations/v1/cities/autocomplete';
            const params = new HttpParams()
                .set('apikey', environment.apiKey)
                .set('q', text);
            this.http.get(url,{ params:params} ).subscribe((data: any[]) => {
                data.forEach(item => {
                    let place = {} as MyLocation;
                    place.city = item.LocalizedName;
                    place.cityKey = item.Key;
                    this.autoCompleteArr.push(place);
                })
                this.autoCompleteFinishLoading.next(true);
            }, (error) => {
                this.errorHandler(error);
            });
        }
    }

    errorHandler(error) {
        this.errorMessage = "The allowed number of requests has been exceeded.";
        this.httpError.next(true);
    }

    getErrorMessage() {
        return this.errorMessage;
    }

    getAutoCompleteArr() {
        return [...this.autoCompleteArr];
    }

    getWeather(cityName: string) {
        this.currentDay = {} as WeatherDay;
        this.week = [] as WeatherDay[];
        const indexOf = this.autoCompleteArr.findIndex(item => item.city === cityName);
        if (indexOf !== -1) {
            const location = this.autoCompleteArr[indexOf];
            this.getAllWeather(location);
        } else {
            this.getAllWeatherByCityName(cityName);
        }
    }

    getAllWeather(location : MyLocation) {
        const url: string = environment.weatherApi + 'currentconditions/v1/' + location.cityKey;
        console.log(url);
        const params = new HttpParams()
            .set('apikey', environment.apiKey);
        this.http.get(url, { params:params}).subscribe((data: any) => {
            const weather: any = data[0];
            let weatherDay = {} as WeatherDay;
            weatherDay.city = location.city;
            weatherDay.cityKey = location.cityKey;
            weatherDay.date = new Date(weather.LocalObservationDateTime);
            weatherDay.dayAsStr = moment(weatherDay.date).format('ddd');
            weatherDay.dayAndMonthAsStr = moment(weatherDay.date).format('DD-MM');
            weatherDay.epochTime = weather.EpochTime;
            weatherDay.icon = 'assets/icons/' + weather.WeatherIcon + '.png';
            weatherDay.unit = weather.Temperature.Metric.Unit;
            weatherDay.temperature = weather.Temperature.Metric.Value;
            weatherDay.weatherText = weather.WeatherText;
            this.currentDay = weatherDay;
            this.getFiveDaysWeather(location.cityKey,location.city);
        }, (error) => {
            this.errorHandler(error);
        })
    }

    getAllWeatherByCityName(cityName: string) {
        const url: string = environment.weatherApi + 'locations/v1/cities/search';
        console.log(url);
        const params = new HttpParams()
            .set('apikey', environment.apiKey)
            .set('q', cityName);
        this.http.get(url, { params }).subscribe((data: any) => {
            const cityKey = data[0].Key;
            const newCityName = data[0].EnglishName;
            this.getFiveDaysWeather(cityKey, newCityName);
        }, (error) => {
            this.errorHandler(error);
        });
    }

    getFiveDaysWeather(cityKey: string, cityName: string) {
        const url: string = environment.weatherApi + 'forecasts/v1/daily/5day/' + cityKey;
        console.log(url);
        const params = new HttpParams()
            .set('apikey', environment.apiKey)
            .set('metric', 'true');
        this.http.get(url, { params:params}).subscribe((data: any) => {
            const dailyForecasts: any[] = data.DailyForecasts;
            dailyForecasts.forEach(day => {
                let weatherDay = {} as WeatherDay;
                weatherDay.city = cityName;
                weatherDay.cityKey = cityKey;
                weatherDay.date = new Date(day.Date);
                weatherDay.dayAsStr = moment(weatherDay.date).format('ddd');
                weatherDay.dayAndMonthAsStr = moment(weatherDay.date).format('DD-MM');
                weatherDay.epochTime = day.EpochDate;
                weatherDay.icon = 'assets/icons/' + day.Day.Icon + '.png';
                weatherDay.unit = day.Temperature.Maximum.Unit;
                weatherDay.temperature = Math.floor((day.Temperature.Maximum.Value + day.Temperature.Minimum.Value) / 2);
                this.week.push(weatherDay);
            });
            this.finishLoading.next(true);
        }, (error) => {
            this.errorHandler(error);
        })
    }

    getWeek() {
        return this.week;
    }

    getCurrentDay() {
        return this.currentDay;
    }
}