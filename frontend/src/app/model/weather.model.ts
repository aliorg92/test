// weather.model.ts
export class Weather {
    temperature: string;
    feelsLikeTemp: number;
    humidity: number;
    pressure: number;
    summary: string;
    city_name: string;
  
    constructor(
      temperature: string = '',
      feelsLikeTemp: number = 0,
      humidity: number = 0,
      pressure: number = 0,
      summary: string = '',
      city_name: string = ''
    ) {
      this.temperature = temperature;
      this.feelsLikeTemp = feelsLikeTemp;
      this.humidity = humidity;
      this.pressure = pressure;
      this.summary = summary;
      this.city_name = city_name;
    }
  }
  
  
  
  