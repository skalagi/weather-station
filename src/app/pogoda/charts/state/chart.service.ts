import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { ChartStore } from './chart.store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private types = new Set();

  constructor(private store: ChartStore, private http: HttpClient) { }

  private parseData(data, type, range) {
    let _data = [...data];

    if (type === 'humidity' && range === 'day') {
      _data = _data.filter(point => point[1]);
    } else if (type === 'barometer' && range === 'day') {
      _data = _data.filter(point => point[1]);
    }
    /*else if (type === 'wind') {
      if (range === 'day') {

      } else {
        // _data = _data.filter(point => (point[2] <= 50) && (point[1] <= 50));
      }
    }
    */


    return _data.map(point => {
      const points = [point[0], +point[1].toFixed(1)];

      if (point[2]) {
        points[2] = +point[2].toFixed(1);
      }

      return points;
    });
  }

  decodeType(type) {
    switch (type) {
      case 'outTemp': return 'temperature';
      case 'outHumidity': return 'humidity';
      case 'windGust': return 'wind';
    }

    return type;
  }

  encodeType(rawType) {
    switch (rawType) {
      case 'temperature': return 'outTemp';
      case 'humidity': return 'outHumidity';
      case 'wind': return 'windGust';
    }

    return rawType;
  }

  update() {
    // TODO
  }

  load(type, range) {
    this.store.setLoading(true);

    const chartType = this.encodeType(type);

    if (this.types.has(type + range)) {
      this.store.setLoading(false);
      return;
    }

    this.types.add(type + range);

    this.http.get(`${ environment.apiSource }/${ range }-charts/${ chartType }.json`)
      .subscribe(data => {
        this.store.setState(state => {
          const _type = { ...state[type] };

          _type[range] = this.parseData(data, type, range);

          return { ...state, [type]: _type };
        });
        this.store.setLoading(false);
      }, err => { this.store.setError(err); });
  }

}
