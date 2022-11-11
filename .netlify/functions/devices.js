const { default: axios } = require("../../src/api/axios");

exports.handler = async (event, context) => {
  console.log("get devices", JSON.parse(event.body));
  let body = JSON.parse(event.body);
  try {
    const response = await axios.get(`/rest/v2.4/cameras`, {
      headers: {
        Authorization: `bearer ${body.token}`,
      },
      Accept: "application/json",
    });
    const cameras = response.data;
    const statusRes = await axios.get(`/rest/v2.4/cameras/all/status`, {
      headers: {
        Authorization: `bearer ${body.token}`,
      },
      Accept: "application/json",
    });
    const camerasStatus = statusRes.data;

    console.log(cameras, "ressssss");
    let result = [];

    // const headers = new Headers();
    // headers.set("Authorization", `bearer ${body.token}`);

    for (let i = 0; i < cameras.length && camerasStatus.length; i++) {
      let snapshot = await fetch(
        `http://rest.cameramanager.com/rest/v2.4/cameras/${cameras[i].cameraId}/snapshot?resolution=1000x100&includeTimestamp=false`,
        {
          headers: {
            Authorization: `bearer ${body.token}`,
          },
        }
      );

      // Convert the data to Base64 and build a data URL.
      const binaryData = await snapshot.arrayBuffer();
      const base64 = arrayBufferToBase64(binaryData);
      const dataUrl = `data:image/png;base64,${base64}`;

      result.push({ ...cameras[i], ...camerasStatus[i], imageUrl: dataUrl });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result),
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

function arrayBufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}
