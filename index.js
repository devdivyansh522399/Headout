const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const DATA_DIR = `/Data/`;

app.get("/data", (req, res) => {
  try {
    const n = req.query.n;
    const m = req.query.m;
    if (!n) {
      return res.status(400).send({
        success: false,
        message: "Error: n must be specified",
      });
    }

    let filePath = `${DATA_DIR}${n}.txt`;
    filePath = path.join(process.cwd(), filePath);
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return res.status(404).send({
          success: false,
          message: "Error: in fileReading",
        });
      } else {
        if (!m) {
          return res.status(200).send({
            success: true,
            data: data,
          });
        }
        let line = parseInt(m);
        let dataArray = data
          .replace("\r", "")
          .split("\n")
          .filter((item) => {
            if (item != "") {
              return item;
            }
          });
        if (m > dataArray.length) {
          return res.status(200).send({
            success: true,
            message: "Line is not exist in the file",
          });
        }
        return res.status(200).send({
          success: true,
          data: dataArray[m - 1],
        });
      }
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Line is not exist in the file",
    });
  }
});

// Start the server on port 8080
app.listen(process.env.PORT, () => {
  console.log("Server running on port 8080");
});
