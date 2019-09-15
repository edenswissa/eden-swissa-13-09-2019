import { Component, OnInit, Input } from '@angular/core';
import { WeatherDay } from 'src/app/models/WeatherDay';

@Component({
  selector: 'app-one-day',
  templateUrl: './one-day.component.html',
  styleUrls: ['./one-day.component.scss']
})
export class OneDayComponent implements OnInit {

  @Input() weatherDay : WeatherDay;
  @Input() favoritePage : boolean;

  constructor() { }

  ngOnInit() {
  }

}
