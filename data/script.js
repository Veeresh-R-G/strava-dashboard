const http = require("https");
const fs = require("fs");

const helper = (page_number) => {
  const options = {
    method: "GET",
    hostname: "www.strava.com",
    port: null,
    path: `/api/v3/clubs/1235636/members?per_page=200&page=${page_number}`,
    headers: {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Authorization: "Bearer 7ae2c36c89b6b0bb85efffc38c97e77709a1700f",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);

      fs.appendFile("club_member.json", body.toString(), (err) => {
        if (err) {
          console.log("Error while writing to the file");
        } else {
          console.log("Saved data in json✅");
        }
      });
    });
  });

  req.end();
};

for (let index = 1; index < 4; index++) {
  helper(index);
}
