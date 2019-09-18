import {Alert} from 'react-native';
import {call, put} from 'redux-saga/effects';
import {Creators as GymActions} from '~/store/ducks/gym';
import api from '~/services/api';

export function* getGyms() {
  try {
    const response = yield call(api.get, 'gyms');
    yield put(GymActions.getGymsSuccess(response.data));
  } catch (error) {
    yield put(GymActions.getGymsFailure('Erro ao buscar academias'));
  }
}

export function* postGyms(action) {
  const {idGym, idActivity} = action.payload;
  try {
    const body = {
      gymId: idGym,
      activityId: idActivity,
    };
    const response = yield call(api.post, 'checkin', body);
    yield put(GymActions.postGymActivitySuccess());
    Alert.alert(
      'Check In',
      `${response.data.checkinStatus}\n\nAcademia: ${
        response.data.gym.title
      }\nAtividade: ${response.data.gym.activity.title}\n`,
      [{text: 'OK', onPress: () => {}}],
      {cancelable: false},
    );
  } catch (error) {
    yield put(GymActions.postGymActivityFailure('Erro ao fazer checkin'));
  }
}
