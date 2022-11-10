import axios from "axios";
// import axios from "../../api/axios";
import history from "../../history";

export const GET_DEVICES = "GET_DEVICES";
export const GET_DEVICES_ERR = "GET_DEVICES_ERR";
export const GET_CAMERA = "GET_CAMERA";
export const GET_CAMERA_ERR = "GET_CAMERA_ERR";

export const getDevices = () => async (dispatch) => {
  try {
    // email = "onlinedemo@cameramanager.com";
    // password = "demo1234";
    const response = await axios.post(`/.netlify/functions/devices`, {
      token: localStorage.getItem("token"),
    });
    console.log(response.data, "response");
    dispatch({ type: GET_DEVICES, payload: { list: response.data } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_DEVICES_ERR,
      payload: { err: "Couldn't Fetch Devices" },
    });
    // callback();
  }
};

export const getCamera = (id) => async (dispatch) => {
  try {
    const response = await axios.post(`/.netlify/functions/camera`, {
      token: localStorage.getItem("token"),
      id,
    });
    console.log(response.data, "response camera");
    dispatch({ type: GET_CAMERA, payload: { camera: response.data } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_DEVICES_ERR,
      payload: { err: "Couldn't Fetch Camera Details" },
    });
  }
};
