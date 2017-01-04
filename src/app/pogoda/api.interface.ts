export interface Unit {
  name: string;
  units: string;
  value: any;
}

export interface Pressure {
  current: Unit;
  trend: Unit;
}

export interface Rain {
  current: Unit;
  sum: Unit;
}

export interface WindUnit {
  translated: string;
  speed: Unit;
  dir: Unit;
}

export interface Wind {
  current: WindUnit;
  gust: WindUnit;
}

export interface Time {
  next: Unit;
  data: Unit;
}

export interface Temperature {
  dewPoint: Unit;
  current: Unit;
  trend: Unit;
  real: Unit;
}

export interface PogodaSkalagiApi {
  temperature: Temperature;
  barometer: Pressure;
  humidity: Unit;
  count: number;
  rain: Rain;
  wind: Wind;
  time: Time;
}