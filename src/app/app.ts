import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { NavBar } from './nav-bar/nav-bar';
import { WeatherCard } from './weather-card/weather-card';
import { QuotationCard } from './quotation-card/quotation-card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer, NavBar, WeatherCard, QuotationCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('projeto-noticias');
}
