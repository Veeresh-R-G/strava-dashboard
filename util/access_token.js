export default async function getAccessToken() {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let bodyContent =
    "client_id=125102&client_secret=baf7f62b9ccc8636309d04404f9673f3c8bc9f95&refresh_token=4b4fcb0ea198b7e093e866ed316f88530c16f71b&grant_type=refresh_token";

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