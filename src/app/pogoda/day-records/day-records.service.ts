import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { environment } from "../../../environments/environment";

@Injectable()
export class DayRecordsService {
  constructor(private http: Http) {}

  get records() {
    return this.http.get(`${environment.apiSource}/day-records.json`)
      .map(res => res.json())
  }
}