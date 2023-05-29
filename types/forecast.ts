export interface ForecastConfig {
  start: Date;
  duration: String;
}

export interface ForecastLength {
  days: Number;
  hours: Number;
  milliseconds: Number;
  minutes: Number;
  months: Number;
  seconds: Number;
  years: Number;
}

export interface Forecast {
  dates: ForecastData[];
}

export interface ForecastData {
  date: Date;
  [key: string]: any;
}