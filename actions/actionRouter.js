const express = require("express")
const Data = require("../data/helpers/actionModel")
const actionRouter = express.Router()

// GET list of actions
actionRouter.get("/", (req, res) => {
  Data.get()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(404).json({ errorMesssage: "Not found" }))
})

// GET action by ID
actionRouter.get("/:id", (req, res) => {
  const { id } = req.params

  Data.get(id)
    .then(actions =>
      actions.length === 0
        ? res
            .status(404)
            .json({
              message: "The action with the specified ID does not exist",
              error: error
            }) & console.log(actions)
        : res.status(200).json(actions)
    )
    .catch()
})
module.exports = actionRouter
