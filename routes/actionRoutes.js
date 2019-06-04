const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile"); // import knexfile object
const db = knex(knexConfig.development); // import knecConfig developement object to get db directory

router.get("/", async (req, res) => {
  try {
    const actions = await db("actions");
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//localhost:3000/api/actions => takes description: string, notes:string, completed: boolean
router.post("/", async (req, res) => {
  const { description, notes, project_id } = req.body;
  if (!notes || !description || !project_id) {
    res.status(404).json({
      message: "Adding an action requires a description, notes, and project_id"
    });
  }
  try {
    const action = await db("actions").insert(req.body);
    res.status(201).json(action);
  } catch (err) {
    res
      .status(500)
      .json({ message: "This actions information could not be fetched" });
  }
});


module.exports = router;
