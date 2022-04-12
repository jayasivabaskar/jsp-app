import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import createReducers from "./CombinedReducers";
import monitorReducersEnhancer from "./Enhancers/MonitorReducers";
import loggerMiddleware from "./Middleware/Logger";
import sagas from "./Sagas";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const middlewares = [sagaMiddleware];
  let composedEnhancers;

  if (process.env.NODE_ENV === "development") {
    const devMiddlerwareEnhancers = applyMiddleware(...middlewares, loggerMiddleware);
    composedEnhancers = compose(
      devMiddlerwareEnhancers,
      monitorReducersEnhancer
    );
  } else {
    composedEnhancers = applyMiddleware(...middlewares);
  }

  const store = createStore(createReducers(), initialState, composedEnhancers);
  store.runSaga = sagaMiddleware.run;
  store.dynamicReducer = {};
  store.injectedSagas = {};

  Object.keys(sagas).forEach(key => {
    store.injectedSagas[key] = store.runSaga(sagas[key]);
  });

  return store;
}