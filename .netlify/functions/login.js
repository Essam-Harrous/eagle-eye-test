const { default: axios } = require("../../src/api/axios");

exports.handler = async (event, context) => {
  console.log("lambda function", event.httpMethod);
  email = "onlinedemo@cameramanager.com";
  password = "demo1234";
  try {
    const response = await axios.post(
      `/oauth/token?grant_type=password&scope=write&username=${email}&password=${password}`,
      undefined,
      {
        headers: {
          Authorization:
            "Basic ZGV2X3Rlc3Q6M0gxQmY2bUNjdElncEN1enZybnlla2YzVmhBVUVuS0o=",
        },
        Accept: "application/json",
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
