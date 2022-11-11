// import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act } from "react-test-renderer";
import { render, screen } from "../../utils/test-utils";
import SigninScreen from "../screens/Signin";
import * as authActions from "../store/actions/authActions";
import mockAxios from "jest-mock-axios";

describe("Login Screen", () => {
  // act(() => {
  // });
  const user = userEvent.setup();

  render(<SigninScreen />);
  beforeEach(() => {
    jest.spyOn(authActions, "signIn");
  });

  it("test login success", async () => {
    mockAxios.post.mockImplementationOnce((url, data) => {
      console.log(data, "event");
      if (url === "/.netlify/functions/login") {
        if (
          data?.email === "onlinedemo@cameramanager.com" &&
          data?.password === "demo1234"
        ) {
          return Promise.resolve({ data: { access_token: "skdlfjlkjsdf" } });
        } else {
          return Promise.reject({ err: "skdlfjlkjsdf" });
        }
      }
    });
    await user.type(
      screen.getByPlaceholderText("you@example.com"),
      "onlinedemo@cameramanager.com"
    );
    await user.type(screen.getByPlaceholderText("password"), "demo1234");
    await user.click(screen.getByText("Login"));

    //check the signin action to be called
    expect(authActions.signIn).toHaveBeenCalledTimes(1);

    //make sure that axios request has been done
    expect(mockAxios.post).toHaveBeenCalledWith("/.netlify/functions/login", {
      email: "onlinedemo@cameramanager.com",
      password: "demo1234",
    });
  });
});
