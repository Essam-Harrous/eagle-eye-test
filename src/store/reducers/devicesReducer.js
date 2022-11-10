/* eslint-disable import/no-anonymous-default-export */
import { GET_DEVICES, GET_DEVICES_ERR } from "../actions";

const INITIAL_STATE = {
  list: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DEVICES:
      return { list: action.payload.list };
    case GET_DEVICES_ERR:
      return { list: [], err: action.payload.err };
    default:
      return state;
  }
};
