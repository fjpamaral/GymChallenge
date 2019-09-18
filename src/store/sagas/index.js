import {all, takeLatest} from 'redux-saga/effects';
import {Types as GymTypes} from '~/store/ducks/gym';

import {getGyms, postGyms} from './gym';

export default function* rootSaga() {
  yield all([takeLatest(GymTypes.GET_GYMS_REQUEST, getGyms)]);
  yield all([takeLatest(GymTypes.POST_GYM_ACTIVTY_REQUEST, postGyms)]);
}
