import { Map } from 'immutable';
import {
  LOAD_PLATOONS_FAILURE,
  LOAD_PLATOONS_SUCCESS
} from '../actions/constants';
import {
  ADD_PLATOON_SUCCESS,
  DELETE_PLATOON_SUCCESS,
  UPDATE_PLATOON_SUCCESS
} from '../pages/platoons/constants';

const initialState = Map({
  ids: [],
  platoons: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLATOON_SUCCESS:
    case DELETE_PLATOON_SUCCESS:
    case LOAD_PLATOONS_SUCCESS:
      return state.merge({
        ids: payload.ids,
        platoons: payload.platoons,
        errors: []
      });
    case UPDATE_PLATOON_SUCCESS:
      return state.merge({
        platoons: payload
      });
    case LOAD_PLATOONS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
