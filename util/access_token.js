export default async function getAccessToken() {
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let bodyContent =
    "client_id=118833&client_secret=54d442bcf3419c770112b8c9fa52550da5513a00&refresh_token=e081b51dfa1487c5ee79ee529f5e8b36ef9b6242&grant_type=refresh_token";

  let response = await fetch("https://www.strava.com/api/v3/oauth/token", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.text();
  //   console.log(JSON.parse(data).access_token);
  return JSON.parse(data).access_token;
}
