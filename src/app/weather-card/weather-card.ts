import { Component, input } from '@angular/core';

interface IWeatherCardInfo {
  local: string;
  minDegree: number;
  maxDegree: number;
  weather: "Nublado" | "Ensolarado" | "Chuvoso" | "Tempestade" | "Nevado";
  season: "Inverno" | "Verão" | "Outono" | "Primavera";
}

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.scss',
})
export class WeatherCard {
  infos = input<IWeatherCardInfo>();
}
