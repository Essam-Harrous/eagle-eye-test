/* eslint-disable import/no-anonymous-default-export */
import { SIGN_IN, LOG_OUT, SIGN_IN_FAILED, TOKEN_EXPIRED } from "../actions";

const INITIAL_STATE = {
  token: null,
  admin: {},
  isLoading: true,
  err: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { token: action.payload.token, isLoading: false };
    case LOG_OUT:
      return { token: null, admin: {}, isLoading: false, err: null };
    case SIGN_IN_FAILED:
      return {
        token: null,
        admin: {},
        isLoading: false,
        err: action.payload.err,
      };
    case TOKEN_EXPIRED:
      return { token: null, admin: {}, isLoading: false, err: null };
    default:
      return state;
  }
};
