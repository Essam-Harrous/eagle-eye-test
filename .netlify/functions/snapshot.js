const { default: axios } = require("../../src/api/axios");
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  try {
    // const headers = new Headers();
    // headers.set(
    //   "Authorization",
    //   `bearer 3d57e1c6-0b9e-4499-947b-a0c6eaa869d9:10002`
    // );
    let response = await fetch(
      "http://rest.cameramanager.com/rest/v2.4/cameras/1841837/snapshot?resolution=1000x100&includeTimestamp=false",
      {
        headers: {
          Authorization: `bearer 3d57e1c6-0b9e-4499-947b-a0c6eaa869d9:10002`,
        },
      }
    );

    // const cameraImg = snapshot.data;

    // Convert the data to Base64 and build a data URL.
    const binaryData = await response.arrayBuffer();
    console.log("binary data", binaryData);
    const base64 = arrayBufferToBase64(binaryData);
    const dataUrl = `data:image/png;base64,${base64}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
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
