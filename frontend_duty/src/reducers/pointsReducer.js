import { Map } from 'immutable';
import { LOAD_POINTS_FAILURE, LOAD_POINTS_SUCCESS } from '../actions/constants';
import {
  ADD_POINT_SUCCESS,
  DELETE_POINT_SUCCESS,
  UPDATE_POINT_SUCCESS
} from '../pages/points/constants';

const initialState = Map({
  ids: [],
  points: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POINT_SUCCESS:
    case DELETE_POINT_SUCCESS:
    case LOAD_POINTS_SUCCESS:
      return state.merge({
        ids: payload.ids,
        points: payload.points,
        errors: []
      });
    case UPDATE_POINT_SUCCESS:
      return state.merge({
        points: payload
      });
    case LOAD_POINTS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
