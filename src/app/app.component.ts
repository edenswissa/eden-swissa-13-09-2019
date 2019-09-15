import { Component } from '@angular/core';
import { WeatherApiService } from './services/weatherApi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weatherView';
  background: string = "url('assets/backgrounds/defaultO.jpg')";
  headerColor : string="#a1d5ff";  

  constructor(private weatherApiService : WeatherApiService) {
    this.weatherApiService.finishLoading.subscribe(flag => {
      this.getBackgroundFromTemp();
    })
  }

  getBackgroundFromTemp() {
    const temp = this.weatherApiService.getCurrentDay().temperature;
    if(temp < 10) {
      this.background = "url('assets/backgrounds/coldO.jpg')";
      this.headerColor = "#cccccc";
    }
    if (temp >= 10 && temp <= 25) {
      this.background = "url('assets/backgrounds/niceO.jpg')";
      this.headerColor = " #80bfff";
    }
    if (temp > 20) {
      this.background = "url('assets/backgrounds/hotO.jpg')";
      this.headerColor ="#ffd699";
    }
  }
}
