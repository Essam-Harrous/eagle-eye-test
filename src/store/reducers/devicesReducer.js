/* eslint-disable import/no-anonymous-default-export */
import {
  GET_CAMERA,
  GET_CAMERA_ERR,
  GET_DEVICES,
  GET_DEVICES_ERR,
} from "../actions";

const INITIAL_STATE = {
  list: null,
  camera: null,
  isLoadingCamera: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DEVICES:
      return { list: action.payload.list };
    case GET_DEVICES_ERR:
      return { list: [], err: action.payload.err };
    case GET_CAMERA:
      return { camera: action.payload.camera, isLoadingCamera: false };
    case GET_CAMERA_ERR:
      return { isLoadingCamera: false, errCamera: action.payload.err };
    default:
      return state;
  }
};
