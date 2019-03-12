import { takeEvery, call, put, cancel, all } from 'redux-saga/effects';
import API from '../api';
import * as actions from '../actions';

function* watchFetchDrone(action) {
  const data = yield call(API.findDrone);
  const { error } = yield call(API.findDrone);
  if (error) {
    console.log(error);
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }

  if (!data) {
    yield put({ type: actions.API_ERROR });
    yield cancel();
    return;
  }

  yield put({ type: actions.DRONE_DATA_RECEIVED, data });
}

function* watchAppLoadDrone() {
  yield all([
    takeEvery(actions.FETCH_DRONE, watchFetchDrone),
    takeEvery(actions.REFETCH_DRONE, watchFetchDrone)
  ]);
}

export default [watchAppLoadDrone];
