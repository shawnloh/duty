import { Map } from 'immutable';
import {
  ADD_PLATOON_FAILURE,
  ADD_PLATOON,
  ADD_PLATOON_SUCCESS,
  DELETE_PLATOON,
  DELETE_PLATOON_SUCCESS,
  DELETE_PLATOON_FAILURE,
  UPDATE_PLATOON,
  UPDATE_PLATOON_FAILURE,
  UPDATE_PLATOON_SUCCESS
} from './constants';

const initialState = Map({
  errors: [],
  actionInProgress: false
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PLATOON:
    case DELETE_PLATOON:
    case UPDATE_PLATOON:
      return state.merge({
        actionInProgress: true,
        errors: []
      });
    case ADD_PLATOON_SUCCESS:
    case DELETE_PLATOON_SUCCESS:
    case UPDATE_PLATOON_SUCCESS:
      return state.merge({
        actionInProgress: false,
        errors: []
      });
    case ADD_PLATOON_FAILURE:
    case DELETE_PLATOON_FAILURE:
    case UPDATE_PLATOON_FAILURE:
      return state.merge({
        errors: payload,
        actionInProgress: false
      });

    default:
      return state;
  }
};
