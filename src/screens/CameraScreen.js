import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCamera } from "../store/actions";

const CameraScreen = ({ match }) => {
  console.log(match.params.id);
  let cameraId = match.params.id;
  let dispatch = useDispatch();
  const { isLoadingCamera, camera, errCamera } = useSelector(
    (store) => store.devices
  );

  useEffect(() => {
    dispatch(getCamera(cameraId));
  }, []);

  return (
    <div className="">
      <div className="mt-14">
        <h1 className="text-center text-4xl font-bold">
          {camera && camera.name}
        </h1>
        <div className="mt-14 shadow-md rounded py-4 px-4 bg-gray-100 w-full mx-auto">
          {errCamera ? (
            <div>{errCamera}</div>
          ) : camera ? (
            <div>
              <div className="flex mt-2 items-center ">
                <div>
                  <div className="flex justify-between my-2">
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded items-center">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        Mac:{" "}
                      </p>
                      <p className="text-[11px] my-1">{camera.ethMacAddress}</p>
                    </div>
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        Zone Id:{" "}
                      </p>
                      <p className="text-[11px] my-1">{camera.zoneId}</p>
                    </div>
                  </div>
                  <div className="flex justify-between my-2">
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded items-center">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        camera id:{" "}
                      </p>
                      <p className="text-[11px] my-1">{camera.cameraId}</p>
                    </div>
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        audio enabled:{" "}
                      </p>
                      <p className="text-[11px] my-1">{camera.audioEnabled}</p>
                    </div>
                  </div>
                  <div className="flex justify-between my-2">
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        firmware Status:{" "}
                      </p>
                      <p className="text-[11px] my-1">
                        {camera.firmwareStatus}
                      </p>
                    </div>
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        recording on cloud:{" "}
                      </p>
                      <p className="text-[11px] my-1">
                        {camera.recordingOnCloud ? "✅" : "❌"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between my-2">
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        deviceTypeId:{" "}
                      </p>
                      <p className="text-[11px] my-1">{camera.deviceTypeId}</p>
                    </div>

                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        password known:{" "}
                      </p>
                      <p className="text-[11px] my-1">
                        {camera.passwordKnown ? "✅" : "❌"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between my-2">
                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        password status:{" "}
                      </p>
                      <p className="text-[11px] my-1">
                        {camera.passwordStatus}
                      </p>
                    </div>

                    <div className="flex mx-3 mt-3 bg-[#C1DDFC] items-center py-2 px-3 min-w-[200px] rounded">
                      <p className="text-[12px] my-1 font-bold mr-1 text-[#434242]">
                        online:{" "}
                      </p>
                      <p
                        className={`my-1 w-2 h-2 rounded-full ${
                          camera.online ? "bg-green-500" : "bg-danger"
                        } mr-2`}
                      ></p>
                    </div>
                  </div>
                </div>
                <div className="ml-auto overflow-hidden rounded-lg">
                  <div className="relative overflow-hidden w-[650px] h-[370px]">
                    <img src={camera.imageUrl} width={700} />
                    <div
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(0, 0, 0, 0) 22.41%, rgba(0, 0, 0, 0.8) 100%)",
                      }}
                      className="top-0 w-full h-full absolute "
                    ></div>
                    <div className="absolute w-full bottom-0 text-white px-4 py-2">
                      <div className="flex items-center">
                        <p
                          className={`w-2 h-2 rounded-full  ${
                            camera.online ? "bg-green-500" : "bg-danger"
                          } mr-2`}
                        ></p>
                        <p className="text-[11px] my-1 font-bold">online</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className=" flex justify-center items-center my-5">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraScreen;
