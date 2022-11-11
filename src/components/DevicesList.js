import React from "react";
import Device from "./Device";

const DevicesList = ({ devices }) => {
  return (
    <div className="flex flex-wrap justify-between">
      {devices.map((item, i) => (
        <Device key={item.cameraId} device={item} />
      ))}
    </div>
  );
};

export default DevicesList;
