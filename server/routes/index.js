const router = require("express").Router();
const idomoo = require("../external/idomoo");

router.get("/getProps", async (req, res) => {
  try {
    let response = await idomoo.sendGetRequest();
    res.json(response.data);
  } catch (error) {
    console.error("ERROR", error.message);
    res.status(500).json(response.error);
  }
});

router.post("/generateVideo", async (req, res) => {
  let data = req.body;
  console.log("IN POST REQUEST, RECIEVED DATA FROM CLIENT IS: " + data);
  if (data) {
    try {
      const response = await idomoo.sendPostRequest(data);
      console.log(response);
      res.json(response);
    } catch (error) {
      console.error("ERROR", error.message);
      res.status(500).json(response.error);
    }
  } else {
    res.status(500).json({ error: "Invalid input" });
  }
});

router.get("*", () => {
  throw new NotFoundError("Requested resource not found");
});

module.exports = { router };
