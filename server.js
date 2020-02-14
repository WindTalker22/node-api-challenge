const express = require("express")
const helmet = require("helmet")

const projectRouter = require("./projects/projectRouter")
const actionRouter = require("./actions/actionRouter")

const server = express()

// global middleware
server.use(express.json()) // built-in middleware

server.use(helmet()) // third-party  middleware

// server.use("/api/projects", logger, projectRouter)
// server.use("/api/actions", logger, actionRouter)

server.get("/", logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
})

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.url}`
  )

  next()
}

module.exports = server
