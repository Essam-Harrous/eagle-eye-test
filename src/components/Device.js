import React from "react";
import { Link } from "react-router-dom";

const Device = ({ device }) => {
  return (
    <Link to={"/camera/" + device.cameraId}>
      <div className="w-[550px] rounded-[15px] overflow-hidden bg-white my-3">
        <div className="relative overflow-hidden w-[550px] h-[290px]">
          <img src={device.imageUrl} width={550} />
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0) 22.41%, rgba(0, 0, 0, 0.8) 100%)",
            }}
            className="top-0 w-full h-full absolute "
          ></div>
          <div className="absolute w-full bottom-0 text-white px-4 py-2">
            <h2 className="text-left mt-2 font-bold text-xl">{device.name}</h2>
            <div className="flex mt-1 justify-between">
              <div className="flex items-center">
                <p
                  className={`w-2 h-2 rounded-full  ${
                    device.online ? "bg-green-500" : "bg-danger"
                  } mr-2`}
                ></p>{" "}
                <p className="text-[11px] my-1 font-bold">online</p>
              </div>
              <p className="text-[11px] my-1">
                recording on cloud {device.recordingOnCloud ? "  ✅" : "  ❌"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Device;
