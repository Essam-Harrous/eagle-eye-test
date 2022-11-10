const { default: axios } = require("../../src/api/axios");

exports.handler = async (event, context) => {
  console.log("get devices", JSON.parse(event.body));
  let body = JSON.parse(event.body);
  try {
    const response = await axios.get(`/rest/v2.4/cameras/${body.id}`, {
      headers: {
        Authorization: `bearer ${body.token}`,
      },
      Accept: "application/json",
    });
    const camera = response.data;
    const statusRes = await axios.get(`/rest/v2.4/cameras/${body.id}/status`, {
      headers: {
        Authorization: `bearer ${body.token}`,
      },
      Accept: "application/json",
    });
    const cameraStatus = statusRes.data;

    const headers = new Headers();
    headers.set("Authorization", `bearer ${body.token}`);
    let snapshot = await fetch(
      `http://rest.cameramanager.com/rest/v2.4/cameras/${body.id}/snapshot?resolution=1000x100&includeTimestamp=false`,
      { headers }
    );

    // Convert the data to Base64 and build a data URL.
    const binaryData = await snapshot.arrayBuffer();
    const base64 = arrayBufferToBase64(binaryData);
    const dataUrl = `data:image/png;base64,${base64}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        ...cameraStatus,
        ...camera,
        imageUrl: dataUrl,
      }),
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
