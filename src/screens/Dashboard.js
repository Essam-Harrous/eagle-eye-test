import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DevicesList from "../components/DevicesList";
import { logOut } from "../store/actions";
import { getDevices } from "../store/actions/deviceActions";

const Dashboard = () => {
  const { list, err } = useSelector((store) => store.devices);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDevices());
  }, []);

  return (
    <div className="">
      <div className="mt-5">
        <h1 className="text-center text-xl">My Cameras</h1>
        <div className="mt-5 shadow-sm py-4 px-4 bg-gray-100">
          {err ? (
            <div>{err}</div>
          ) : list === null ? (
            <div class=" flex justify-center items-center my-5">
              <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
            </div>
          ) : list.length ? (
            <DevicesList devices={list} />
          ) : (
            <div>No Cameras found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
