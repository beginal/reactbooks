import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import counter, { counterSaga } from './counter';
import sample, { sampleSaga} from './sample';
import loading from './loading';

const rootReducer = combineReducers({
  counter,
  sample,
  loading
});

export function* rootSaga() {
  yield all([counterSaga(), sampleSaga()]);
  // all은 여러 saga를 합쳐주는 역할을 한다.
}

export default rootReducer;