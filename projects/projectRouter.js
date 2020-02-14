const express = require("express")
const Data = require("../data/helpers/projectModel")
const projectRouter = express.Router()

// GET list of all projects
projectRouter.get("/", (req, res) => {
  Data.get()
    .then(projects => res.status(200).json(projects))
    .catch(error => res.status(404).json({ errorMesssage: "ot found" }))
})

// GET project by ID
projectRouter.get("/:id", validateProjectById, (req, res) => {
  res.status(200).json(req.project)
})

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
