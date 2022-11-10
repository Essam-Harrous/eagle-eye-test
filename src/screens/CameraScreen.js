import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCamera } from "../store/actions";

const CameraScreen = ({ match }) => {
  console.log(match.params.id);
  let cameraId = match.params.id;
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCamera(cameraId));
  }, []);

  return <div>CameraScreen</div>;
};

export default CameraScreen;
