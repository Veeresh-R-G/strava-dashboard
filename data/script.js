const http = require("https");
const fs = require("fs");
const options = {
  method: "GET",
  hostname: "www.strava.com",
  port: null,
  path: "/api/v3/clubs/1235636/members?per_page=200",
  headers: {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Authorization: "Bearer 9f6acbfcbd7456fa3959b5a7e8af7a4b47a0f246",
  },
};

const req = http.request(options, function (res) {
  const chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);

    console.log(JSON.parse(body.toString()).length);
    fs.writeFile("club_member.json", body.toString(), (err) => {
      if (err) {
        console.log("Error while writing to the file");
      } else {
        console.log("Saved data in json✅");
      }
    });
  });
});

req.end();
