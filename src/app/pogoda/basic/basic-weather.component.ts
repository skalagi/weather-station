import { Component, OnInit } from '@angular/core';
import { BasicWeatherService } from './state';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'skalagi-basic-weather',
  templateUrl: './basic-weather.component.html',
  styleUrls: ['./basic-weather.component.scss']
})
export class BasicWeatherComponent implements OnInit {
  cards = [
    { title: 'Wiatr', type: 'wind' },
    { title: 'Temperatura', type: 'temperature' },
    { title: 'Wilgotność', type: 'humidity' },
    { title: 'Ciśnienie', type: 'barometer' },
    { title: 'Opady', type: 'rain' },
  ];

  dropped(ev) {

    moveItemInArray(
      this.cards,
      ev.previousIndex,
      ev.currentIndex,
    );

  }

  constructor(store: BasicWeatherService) { }

  ngOnInit() {
  }

}