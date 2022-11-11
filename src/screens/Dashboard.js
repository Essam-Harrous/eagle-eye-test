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
    <div className="mt-20">
      <div className="mt-5">
        <h1 className="text-center font-bold text-4xl">My Cameras</h1>
        <div className="mt-6 shadow-md rounded p-4 bg-[#F0F1F1]">
          {err ? (
            <div>{err}</div>
          ) : list === null || list === undefined ? (
            <div className=" flex justify-center items-center my-5">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
            </div>
          ) : list?.length ? (
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
