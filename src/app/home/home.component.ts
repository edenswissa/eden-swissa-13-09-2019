import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../services/weatherApi.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MyLocation } from '../models/MyLocation';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form : FormGroup;
  cityName : FormControl;
  showWeather : Boolean = false;
  autoCompleteArr: Observable<String[]>;
  mapToStringAutoCompleteArr : string[] = [];
  isLoading :Boolean = false;

  constructor(private weatherApiService : WeatherApiService, private fb: FormBuilder) {
    this.cityName = new FormControl('',Validators.required);
    this.form = this.fb.group({
      cityName: this.cityName
    });
    this.weatherApiService.finishLoading.subscribe((flag) => {
      if(flag) {
        this.showWeather = flag;
        this.isLoading = !flag;
      }
    });
    this.weatherApiService.autoCompleteFinishLoading.subscribe((flag) => {
      if(flag) {
        this.mapToStringAutoCompleteArr = this.weatherApiService.getAutoCompleteArr().map(item => item.city);
        this.autoCompleteArr = this.cityName.valueChanges.pipe(startWith(''),
          map(value => this._filter(value)));
      }
    })
  }

  ngOnInit() {
    this.mapToStringAutoCompleteArr = [];
  }

  _filter(value : String) : String[]{
    const filterValue = value.toLowerCase();
    return this.mapToStringAutoCompleteArr.filter(place => place.toLowerCase().includes(filterValue));
  }

  displayFunction(place) {
    return place? place : undefined;
  }

  onSubmit() {
    if(this.form.valid) {
      this.isLoading = true;
      const cityNameValue = this.cityNameInput.value;
      this.weatherApiService.getWeather(cityNameValue);
    }
  }

  get cityNameInput() { return this.form.get('cityName'); }

  onInputChange(event) {
    this.weatherApiService.autoComplete(event);
  }

}
