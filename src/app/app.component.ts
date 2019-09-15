import { Component } from '@angular/core';
import { WeatherApiService } from './services/weatherApi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherView';
  background: string = "url('assets/backgrounds/defaultO.jpg')" 

  constructor(private weatherApiService : WeatherApiService) {
    this.weatherApiService.finishLoading.subscribe(flag => {
      this.getBackgroundFromTemp();
    })
  }

  getBackgroundFromTemp() {
    const temp = this.weatherApiService.getCurrentDay().temperature;
    if(temp < 10) {
      this.background = "url('assets/backgrounds/coldO.jpg')"
    }
    if (temp >= 10 && temp <= 25) {
      this.background = "url('assets/backgrounds/niceO.jpg')"
    }
    if (temp > 20) {
      this.background = "url('assets/backgrounds/hotO.jpg')"
    }
  }
}
