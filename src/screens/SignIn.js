import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/actions";

const SignIn = () => {
  const [state, setState] = useState({ isLoading: false });
  const dispatch = useDispatch();
  const { err } = useSelector((state) => state.auth);

  const formSchema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setState((prev) => ({ ...state, isLoading: true }));
      dispatch(
        signIn(values.email, values.password, () => {
          setState((prev) => ({ ...state, isLoading: false }));
        })
      );
    },
    validationSchema: formSchema,
  });

  return (
    <div className="container mx-auto h-[100vh]">
      <div className="h-[100%] flex items-center justify-center">
        <div className="w-[600px] shadow-lg py-7 rounded-[10px]">
          <div className="mt-5 mb-7 flex justify-center">
            <img src="https://auth.cameramanager.com/auth/assets/cameramanager-logo.png" />
          </div>
          <h4 className="text-center">Web App</h4>
          <form
            onSubmit={formik.handleSubmit}
            className="flexf items-center mt-4"
          >
            <label className="block w-[75%] mx-auto">
              <span className=" after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                values={formik.values.email}
                onChange={formik.handleChange}
                type="email"
                name="email"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="you@example.com"
              />
            </label>
            <label className="block w-[75%] mx-auto mt-5">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Password
              </span>
              <input
                values={formik.values.password}
                onChange={formik.handleChange}
                type="password"
                name="password"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="password"
              />
            </label>
            <button
              type="submit"
              disabled={state.isLoading}
              className="pointer-events-auto mt-5 w-[80px] text-center block mx-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500"
            >
              {state.isLoading ? (
                <div className=" flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
