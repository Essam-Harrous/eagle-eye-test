// import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act } from "react-test-renderer";
import { render, screen, waitFor } from "../../utils/test-utils";
import Dashboard from "../screens/Dashboard";
import * as deviceActions from "../store/actions/deviceActions";
import mockAxios from "jest-mock-axios";
import { store } from "../store";

describe("Dashboard Screen", () => {
  // act(() => {
  // });
  const user = userEvent.setup();

  beforeEach(() => {
    jest.spyOn(deviceActions, "getDevices");
  });

  it("test data rendering", async () => {
    mockAxios.post.mockImplementationOnce((url, data) => {
      console.log(data, "event");
      if (url === "/.netlify/functions/devices") {
        if (data?.token === "token") {
          return Promise.resolve({ data: [{ cameraId: "lsjdf" }] });
        } else {
          return Promise.reject({ err: "skdlfjlkjsdf" });
        }
      }
    });
    localStorage.setItem("token", "token");
    render(<Dashboard />);
    console.log(store.getState(), "store state");
    expect((await screen.findByText("My Cameras")).textContent).toBe(
      "My Cameras"
    );

    // check getDevices function get called
    expect(deviceActions.getDevices).toBeCalledTimes(1);

    // check if request has been sent
    expect(mockAxios.post).toHaveBeenCalledWith("/.netlify/functions/devices", {
      token: "token",
    });

    //render device
    expect((await screen.findByText("online")).textContent).toBe("online");
  });
});
