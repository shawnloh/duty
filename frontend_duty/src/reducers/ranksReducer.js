import { Map } from 'immutable';
import { LOAD_RANKS_FAILURE, LOAD_RANKS_SUCCESS } from '../actions/constants';
import {
  ADD_RANK_SUCCESS,
  DELETE_RANK_SUCCESS,
  UPDATE_RANK_SUCCESS
} from '../pages/ranks/constants';

const initialState = Map({
  ids: [],
  ranks: {},
  errors: []
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_RANK_SUCCESS:
    case LOAD_RANKS_SUCCESS:
    case DELETE_RANK_SUCCESS:
      return state.merge({
        ids: payload.ids,
        ranks: payload.ranks,
        errors: []
      });
    case UPDATE_RANK_SUCCESS:
      return state.merge({
        ranks: payload
      });
    case LOAD_RANKS_FAILURE:
      return state.merge({
        errors: payload
      });
    default:
      return state;
  }
};
