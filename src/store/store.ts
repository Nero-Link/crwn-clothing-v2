import { compose, createStore, applyMiddleware, Middleware } from "redux";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { loggerMiddleware } from "./middleware/logger";
// import thunk from "redux-thunk";
//SAGA
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
};

const persistConfig: ExtendedPersistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//SAGA
const sagaMiddleware = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV === "development" && logger,
  // thunk,
  //SAGA
  sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));
// const middleWares = [loggerMiddleware];

const composeEnhancer =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// export const store = createStore(rootReducer, undefined, composedEnhancers);
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

//SAGA
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
