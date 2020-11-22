import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import { RouterState } from 'connected-next-router/types';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    router: RouterState;
}
