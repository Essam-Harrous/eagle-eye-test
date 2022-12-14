import axios from "axios";
// import axios from "../../api/axios";
import history from "../../history";
import toast from "react-hot-toast";

export const SIGN_IN = "SIGN_IN";
export const LOG_OUT = "LOG_OUT";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";
export const TOKEN_EXPIRED = "TOKEN_EXPIRED";

export const signIn = (email, password, callback) => async (dispatch) => {
  try {
    const response = await axios.post(`/.netlify/functions/login`, {
      email,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh-token", response.data.refresh_token);
    console.log(response.data, "response");
    dispatch({ type: SIGN_IN, payload: { token: response.data.access_token } });
    history.replace("/dashboard");
    toast("Login Success", {
      style: {
        color: "green",
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: SIGN_IN_FAILED, payload: { err: "Invalid Data" } });
    toast("Invalid Credentials", {
      style: {
        color: "red",
      },
    });
    // callback();
  } finally {
    callback();
  }
};

export const verifyToken = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      // const response = await axios.get("/admin/verify-token", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      dispatch({
        type: SIGN_IN,
        payload: { token },
      });
      !history.location.pathname.includes("camera") &&
        history.replace("/dashboard");
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
    dispatch({ type: LOG_OUT });
    history.replace("/signin");
  } catch (err) {
    console.log(err);
  }
};
