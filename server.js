const express = require("express");

const port = process.env.PORT || 8080;
var app = express();

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  app.use(express.static(path.join(__dirname, "/client/public")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
