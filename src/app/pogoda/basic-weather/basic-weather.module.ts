import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PortableValueModule } from '../portable-value/portable-value.module';
import { TemperatureModule } from './temperature/temperature.module';
import { ForecastModule } from './forecast/forecast.module';
import { RecordsModule } from '../records/records.module';
import { ChartsModule } from '../charts/charts.module';
import { WindModule } from './wind/wind.module';

import { RainComponent } from './rain/rain.component';
import { BasicWeatherComponent } from './basic-weather.component';
import { PressureComponent } from './pressure/pressure.component';
import { HumidityComponent } from './humidity/humidity.component';
import { RainDetailsComponent } from './rain/rain-details/rain-details.component';
import { HumidityDetailsComponent } from './humidity/humidity-details/humidity-details.component';
import { PressureDetailsComponent } from './pressure/pressure-details/pressure-details.component';
import { MatCardModule, MatIconModule, MatProgressSpinnerModule, MatTabsModule, MatButtonModule } from '@angular/material';
import { BasicCardComponent } from './basic-card/basic-card.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ForecastModule,
    PortableValueModule,

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,

    FlexLayoutModule,
    RecordsModule,
    /*
    TemperatureModule,
    WindModule
    */
  ],

  declarations: [
    BasicWeatherComponent,
    /*
      PressureComponent,
      HumidityComponent,
      RainComponent,
      PressureDetailsComponent,
      HumidityDetailsComponent,
      RainDetailsComponent,
    */
    BasicCardComponent,
  ],

  exports: [BasicWeatherComponent],
})
export class BasicWeatherModule { }
