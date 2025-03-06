import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  // Ajout de l'importation d'Observable
import { Weather } from './model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiUrl = 'http://127.0.0.1:5000/weather'; // URL de ton backend Flask


  constructor(private http: HttpClient) { }

  // Maintenant getweather retourne un Observable
  getweather(city: string, units: string): Observable<any> {
    // Tu peux utiliser les paramètres city et units dans l'URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7c54ea8408b03d38d6de1ac149cb9a9&units=${units}`;
    return this.http.get<any>(url);  // Retourne un Observable de type `any`
  }
  postWeather(data: Weather): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}


