import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../screens/SignIn";
import { Route, Router, Switch } from "react-router-dom";

import { verifyToken } from "../store/actions";

function AuthProvider({ children }) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyToken());
  }, []);

  if (auth.isLoading) {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <h1>Loading</h1>
        </div>
      </div>
    );
  }

  if (auth.token) {
    return children;
  } else {
    return (
      <>
        {/* <Route path="/" exact render={({history}) => history.replace('/signin')} /> */}
        <Route path="/signin" component={SignIn} />
      </>
    );
  }
}

export default AuthProvider;

// {history: {…}, location: {…}, match: {…}, staticContext: undefined}
// history:
// action: "POP"
// block: ƒ block(prompt)
// createHref: ƒ createHref(location)
// go: ƒ go(n)
// goBack: ƒ goBack()
// goForward: ƒ goForward()
// length: 3
// listen: ƒ listen(listener)
// location: {pathname: "/", search: "", hash: "", state: undefined}
// push: ƒ push(path, state)
// replace: ƒ replace(path, state)
// arguments: (...)
// caller: (...)
// length: 2
// name: "replace"
// prototype: {constructor: ƒ}
// __proto__: ƒ ()
// [[FunctionLocation]]: history.js:381
// [[Scopes]]: Scopes[3]
// __proto__: Object
// location: {pathname: "/", search: "", hash: "", state: undefined}
// match: {path: "/", url: "/", isExact: true, params: {…}}
