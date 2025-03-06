import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../model/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city_name: string = 'Tunis';
  units: string = 'imperial';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getweather(this.city_name, this.units).subscribe({

      next: (res) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLikeTemp = this.myWeather.main.feels_like;
        this.humidity = this.myWeather.main.humidity;
        this.pressure = this.myWeather.main.pressure;
        this.summary = this.myWeather.weather[0].main;

        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
        console.log(this.iconURL);
        // Save the weather data to the backend
        const weatherData: Weather = {
          temperature: this.myWeather.main.temp.toString(),
          feelsLikeTemp: this.myWeather.main.feels_like,
          humidity: this.myWeather.main.humidity,
          pressure: this.myWeather.main.pressure,
          summary: this.myWeather.weather[0].main,
          city_name: this.city_name
        };
    
        this.saveWeatherData(weatherData);
        console.log('test here ',weatherData)
      },
      error: (error) => console.log(error.message),

      complete: () => console.info('API call completed')
    })
      
  }
  saveWeatherData(weatherData: Weather): void {
    this.weatherService.postWeather(weatherData).subscribe({
      next: () => console.log('Weather data saved successfully'),
      error: (error) => console.log('Error saving weather data:', error.message)
    });
  }
  onRadioButtonChange(): void {
    this.units = (this.units === 'imperial') ? 'metric' : 'imperial';
    this.getWeather();
  }


}