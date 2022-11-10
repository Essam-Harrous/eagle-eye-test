const { default: axios } = require("../../src/api/axios");

exports.handler = async (event, context) => {
  console.log("lambda function", JSON.parse(event.body));
  let body = JSON.parse(event.body);
  try {
    if (!body.email || !body.password) throw new Error("invalid Data");
    const response = await axios.post(
      `/oauth/token?grant_type=password&scope=write&username=${body.email}&password=${body.password}`,
      undefined,
      {
        headers: {
          Authorization:
            "Basic ZGV2X3Rlc3Q6M0gxQmY2bUNjdElncEN1enZybnlla2YzVmhBVUVuS0o=",
        },
        Accept: "application/json",
      }
    );
    console.log(response.data, "ressssss");
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(err, "errrr");
    return {
      statusCode: 403,
      data: JSON.stringify(err),
      body: JSON.stringify(err),
    };
  }
};
