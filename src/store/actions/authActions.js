import axios from "../../api/axios";
import history from "../../history";

export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";
export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const signIn = (email, password, callback) => async (dispatch) => {
  try {
    email = "onlinedemo@cameramanager.com";
    password = "demo1234";
    const response = await axios.post(
      `/oauth/token?grant_type=password&scope=write&username=${email}&password=${password}`,
      undefined,
      {
        headers: {
          Authorization:
            "Basic ZGV2X3Rlc3Q6M0gxQmY2bUNjdElncEN1enZybnlla2YzVmhBVUVuS0o=",
        },
        Accept: "application/json",
      }
    );
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh-token", response.data.refresh_token);
    history.replace("/home");
    console.log(response.data, "response");
  } catch (err) {
    console.log(err);
    dispatch({ type: SIGN_IN_FAILED, payload: { err: err.response?.data } });
    // callback();
  }
};

export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/admin/verify-token", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: SIGN_IN,
        payload: { admin: response.data.admin, token },
      });
      history.replace("/home");
    } else {
      throw new Error();
    }
  } catch (err) {
    localStorage.removeItem("token");
    history.replace("/signin");
    dispatch({ type: TOKEN_EXPIRED });
  }
};

export const logOut = () => (dispatch) => {
  try {
    localStorage.removeItem("token");
    history.replace("/signin");
    dispatch({ type: LOG_OUT });
  } catch (err) {
    console.log(err);
  }
};