const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//route that retrieves access token in exchange of auth code on login
app.post("/login", (req, res) => {
    const code = req.body.code
    let headersList = {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded",
      };
    let bodyContent = `client_id=126068&client_secret=5bc418998152dd2f9801b27a9bfab19328a37c36&code=${code}&grant_type=authorization_code`;

    fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        body: bodyContent,
        headers: headersList,
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        res.json(data)
        console.log(res)

    })
    .catch(error => console.error(error))
})


app.listen(3001)