import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import gameReducer from './game/game.reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;
