const express = require("express");
const router = express.Router();
const knex = require("knex");
const knexConfig = require("../knexfile"); // import knexfile object
const db = knex(knexConfig.development); // import knecConfig developement object to get db directory

router.get("/", async (req, res) => {
  try {
    const projecets = await db("projecets");
    res.status(200).json(projecets);
  } catch (err) {
    res.status(500).json({
      error: "The projects could not be fetched successfully. Try again."
    });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("projecets")
    .where({ id })
    .first()
    .then(projecets => {
      if (projecets) {
        db("actions")
          .where({ project_id: id })
          .then(actions => {
            projecets.actions = actions;
            res.status(200).json(projecets);
          })
          .catch(err =>
            res.status(500).json({
              message: "There was an error on the servers side. Unexpectedly. ",
              err
            })
          );
      } else {
        res.status(404).json({ message: "User not found with that ID" });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "There was an error on the servers side", err });
    });
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(404).json({
      message: "Adding a project requires a name and description"
    });
  }
  try {
    const projecets = await db("projecets").insert(req.body);
    res.status(201).json(projecets);
  } catch (err) {
    res.status(500).json({ message: "This project could not be created" });
  }
});

module.exports = router;
