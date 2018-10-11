import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PortableValueModule } from '../portable-value/portable-value.module';
import { RecordsModule } from '../records/records.module';

import { BasicWeatherComponent } from './basic-weather.component';
import { MatCardModule, MatIconModule, MatProgressSpinnerModule, MatTabsModule, MatButtonModule } from '@angular/material';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { HttpClientModule } from '@angular/common/http';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { UnitModule } from '../unit/unit.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PortableValueModule,
    HttpClientModule,

    DragDropModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    UnitModule,

    FlexLayoutModule,
    RecordsModule,
  ],

  declarations: [
    BasicWeatherComponent,
    BasicCardComponent,
  ],

  exports: [BasicWeatherComponent],
})
export class BasicWeatherModule { }
