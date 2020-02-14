const express = require("express")
const Data = require("../data/helpers/projectModel")
const projectRouter = express.Router()

// GET list of all projects
projectRouter.get("/", (req, res) => {
  Data.get()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(404).json({ errorMesssage: "Not found" }))
})

// GET project by ID
projectRouter.get("/:id", validateProjectById, (req, res) => {
  res.status(200).json(req.project)
})

// POST Add new project
projectRouter.post("/", (req, res) => {
  const project = req.body
  Data.insert(project)
    .then(project => res.status(201).json(project))
    .catch(error =>
      res.status(500).json({ errorMesssage: "Internal server error" })
    )
})

// PUT request Update project
projectRouter.put("/:id", validateProjectById, (req, res) => {
  const { id } = req.params
  const changes = req.body

  if (!changes.name || !changes.description) {
    res.status(400).json({ message: "Need to update the user name." })
  } else {
    Data.update(id, changes)
      .then(update => {
        res.status(200).json(update)
      })
      .catch(error => {
        console.log(error)
        res.status(500).json({ error: "Failed to update User name" })
      })
  }
})

// Middleware
// ValidateProjectBy
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

module.exports = projectRouter
