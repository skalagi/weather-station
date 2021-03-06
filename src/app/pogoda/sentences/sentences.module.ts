import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentencesComponent } from './sentences.component';
import { MatProgressBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatProgressBarModule,
  ],
  declarations: [SentencesComponent],
  exports: [SentencesComponent]
})
export class SentencesModule {}
