import React from "react";
import { Link } from "react-router-dom";

const Device = ({ device }) => {
  return (
    <Link to={"/camera/" + device.cameraId}>
      <div className="w-[210px] rounded-[15px] overflow-hidden pb-5 bg-white">
        <div className="overflow-hidden w-[210px] h-[120px]">
          <img src={device.imageUrl} width={250} height={172} />
        </div>

        <h2 className="text-center mt-2">{device.name}</h2>
        <div className="flexf mx-3 mt-3">
          <p className="text-[11px] my-1">Mac: {device.ethMacAddress}</p>
          <p className="text-[11px] my-1">Zone Id: {device.zoneId}</p>
          <p className="text-[11px] my-1">
            recording on cloud: {device.recordingOnCloud ? "✅" : "❌"}
          </p>
          <p className="text-[11px] my-1">
            online: {device.online ? "✅" : "❌"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Device;
