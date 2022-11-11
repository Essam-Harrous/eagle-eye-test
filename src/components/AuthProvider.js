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

  console.log(auth, "auth");
  if (auth.isLoading) {
    return (
      <div>
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  if (auth.token) {
    return children;
  } else {
    return (
      <>
        <Route path="/signin" component={SignIn} />
      </>
    );
  }
}

export default AuthProvider;
