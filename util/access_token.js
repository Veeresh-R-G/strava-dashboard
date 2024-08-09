async function getAccessToken() {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let bodyContent =
    "client_id=125102&client_secret=----client-secret-----&refresh_token=------refresh-token-------&grant_type=refresh_token";

  let response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  return JSON.parse(data).access_token;
}

//LOGIN -> Auth Code

//AUTH CODE -> oauth/token grant-type=authorization
//get accesstoken, expiry, refreshtoken
//hit api endpoints

//refresh access token via refreshtoken
