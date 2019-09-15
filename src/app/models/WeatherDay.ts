export interface WeatherDay {
    date: Date;
    dayAsStr: string;
    dayAndMonthAsStr: string
    epochTime: number;
    temperature: number;
    icon: string;
    unit: string;
    weatherText?:string;
    city: string;
    cityKey: string;
}