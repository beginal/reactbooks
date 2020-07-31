import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest, select, throttle } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
export const increaseAsync = createAction(INCREASE_ASYNC, ()=> undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, ()=> undefined);
// () => undefined를 넣는 이유는 마우스 클릭 이벤트가 payload에 들어가지 않도록 하기 위해서

function* increaseSaga() {
  yield delay(1000); // 1초를 기다린다.
  yield put(increase()); // 특정 액션을 디스패치한다. put이 디스패치와 같은 역할
  const number = yield select(state => state.counter); // state는 스토어 상태를 의미
  console.log(`현재 값은 ${number} 입니다`)
};

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
};

export function* counterSaga() {
  yield throttle(3000, INCREASE_ASYNC, increaseSaga);
  // 들어오는 모든 액션에 대해 특정 작업을 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
  // 기존에 진행중이던 작업이 있으면 취소하고 가장 마지막으로 실행된 작업만을 수행한다.
}

const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1,
  },
  initialState
);

export default counter;