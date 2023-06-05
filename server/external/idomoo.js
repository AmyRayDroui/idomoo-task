const axios = require("axios");

const authString = process.env.ACCOUNT_ID + ":" + process.env.SECRET_KEY;
const encodedString = btoa(authString);

async function sendGetRequest() {
  const config = {
    method: "get",
    url: `https://usa-api.idomoo.com/api/v2/storyboards/${process.env.STORYBOARD_ID}`,
    headers: {
      Authorization: `Basic ${encodedString}`,
    },
  };
  let res = await axios(config);
  let data = res.data;
  console.log(data);
  return res;
}

async function sendPostRequest(jsonData) {
  console.log(jsonData);
  const config = {
    method: "post",
    url: `https://usa-api.idomoo.com/api/v2/storyboards/generate`,
    headers: {
      Authorization: `Basic ${encodedString}`,
      "x-idomoo-api-mode": "developer",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    data: jsonData,
  };

  let res = await axios(config);
  let data = res.data;
  console.log(data);
  return data;
}

module.exports = { sendGetRequest, sendPostRequest };
