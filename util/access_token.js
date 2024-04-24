export default async function getAccessToken() {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
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
  //   console.log(JSON.parse(data).access_token);
  return JSON.parse(data).access_token;
}
