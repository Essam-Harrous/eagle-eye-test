/* eslint-disable import/no-extraneous-dependencies */
import * as React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import reducers from "../src/store/reducers";
import AuthProvider from "../src/components/AuthProvider";
import { Router } from "react-router-dom";
import history from "../src/history";
import { Toaster } from "react-hot-toast";

const store = createStore(reducers, applyMiddleware(Thunk));

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <AuthProvider>{children}</AuthProvider>
      </Router>
      <Toaster />
    </Provider>
  );
}

const customRender = (ui: JSX.Element, options?: Record<string, unknown>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
