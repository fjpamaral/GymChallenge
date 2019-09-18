import React from 'react';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import gym from '~/store/ducks/gym';
import Main from '~/pages/Main';
import {render, fireEvent} from '@testing-library/react-native';

const ConnectedMain = connect(state => ({gym: state.gym}))(Main);

function renderWithRedux(
  ui,
  {initialState, store = createStore(gym, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe('Main', () => {
  it('should be able to search for gyms', () => {
    const {getByTestId} = renderWithRedux(<ConnectedMain />);

    fireEvent.changeText(getByTestId('test-SearchInput'), 'Crossfit');
    expect(getByTestId('test-GymItem')).toBeTruthy();
  });
});
