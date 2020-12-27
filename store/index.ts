import Router from "next/router";
import thunk from "redux-thunk";
import { ApplicationState } from "./AppState";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import {
  createRouterMiddleware,
  initialRouterState,
  routerReducer,
} from "connected-next-router";
import { createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { format } from "url";

import * as Counter from "./Counter";
import * as WeatherForecasts from "./WeatherForecasts";

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
const reducers = {
  counter: Counter.reducer,
  weatherForecasts: WeatherForecasts.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

const rootReducer = combineReducers({
  ...reducers,
  router: routerReducer,
});

const reducer = (state, action) => {
  if (action.type == HYDRATE) {
    const nextState = { ...state, ...action.payload };
    if (typeof window !== "undefined") {
      nextState.router = state.router;
    }
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export const initStore = (context): MakeStore => {
  const routerMiddleware = createRouterMiddleware();
  const { asPath, pathname, query } = context.ctx || Router.router || {};
  let initialState;

  if (asPath) {
    const url = format({ pathname, query });
    initialState = {
      router: initialRouterState(url),
    };
  }

  const enhancers = [];
  const windowIfDefined =
    typeof window === "undefined" ? null : (window as any);
  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(
    reducer,
    initialState,
    compose(applyMiddleware(routerMiddleware, thunk), ...enhancers)
  );
};

export const wrapper = createWrapper(initStore);
