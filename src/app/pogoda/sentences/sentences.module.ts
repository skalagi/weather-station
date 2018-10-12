import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentencesComponent } from './sentences.component';
import { MatProgressBarModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatProgressBarModule,
  ],
  declarations: [SentencesComponent],
  exports: [SentencesComponent]
})
export class SentencesModule {}
