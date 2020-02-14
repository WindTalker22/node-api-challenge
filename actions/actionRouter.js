const express = require("express")
const Data = require("../data/helpers/actionModel")
const project = require("../data/helpers/projectModel")
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
        ? res.status(404).json({
            message: "The action with the specified ID does not exist",
            error: error
          }) & console.log(actions)
        : res.status(200).json(actions)
    )
    .catch()
})

// POST add new action
actionRouter.post("/", validateAction, validateProjectById, (req, res) => {
  Data.insert(req.body)
    .then(res => res.status(201).json({ message: res }))
    .catch(error => res.status(400).json({ error: "Bad post request" }))
})

// PUT request to update
actionRouter.put("/:id", validateAction, validateProjectById, (req, res) => {
  Data.update(req.params.id, req.body)
    .then(res => res.status(200).json({ message: res }))
    .catch(error => res.status(400).json({ error: "bad put request" }))
})

// DELETE remove action
actionRouter.delete("/:id", (req, res) => {
  const { id } = req.params

  Data.remove(id)
    .then(action => res.status(200).json(action))
    .catch(error => res.status(400).json({ error: "Bad request" }))
})

// Middleware
// ValidateProjectByID
function validateProjectById(req, res, next) {
  const { id } = req.params
  Data.get(id)
    .then(project =>
      project !== null
        ? (req.project = project) & next()
        : res.status(404).json({ errorMessage: "Project not found" })
    )
    .catch(error =>
      res.status(500).json({ errorMessage: "Internal server error" })
    )
}

// Middleware
// ValidateAction
function validateAction(req, res, next) {
  // do your magic!
  const { id } = req.params
  req.action = req.body

  !req.action
    ? res.status(400).json({ error: "no action" })
    : !req.action.project_id || !req.action.notes || !req.action.description
    ? res.status(400).json({ message: "missing action data" })
    : console.log(req.action, "TEST") & next()
}

// ValidateProjectByID
function validateProjectById(req, res, next) {
  const { project_id } = req.body
  Data.get(project_id)
    .then(project =>
      project !== null
        ? (req.project = project) & next()
        : res.status(404).json({ errorMessage: "Project not found" })
    )
    .catch(error =>
      res.status(500).json({ errorMessage: "Internal server error" })
    )
}
module.exports = actionRouter
