import cors from "cors"
import express from "express"
import chalk from "chalk"
import { checkEnv } from "./services/checkEnv.js"

process.env.NODE_ENV = process.env.NODE_ENV || "development"

// Check that environment variables are set correctly.
checkEnv(chalk.red)

const app = express()
const nodeEnv = process.env.NODE_ENV
const port = process.env.PORT || 3000
const corsOrigin = process.env.CORS_ORIGIN
const corsOptions = {
  methods: "POST", // Limit allowed methods (optional, for security)
  allowedHeaders: "Content-Type", // Limit allowed headers (optional)
}

if (nodeEnv === "production") {
  // Limit requests with CORS to origin
  corsOptions.origin = corsOrigin
}

app.use(cors(corsOptions))

// Middleware to parse incoming JSON requests
app.use(express.json())

// Automatically parse URL-encoded payloads
app.use(express.urlencoded({ extended: true }))

// API endpoint to handle contact form submissions
app.post("/contact/v1", (req, res) => {
  const { name, email, phone, subject, message } = req.body

  try {
    sendMail({ name, email, phone, subject, message })
  } catch (error) {
    console.log(chalk.red("Error:", error))

    return res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." })
  }
})

// Start the server
app.listen(port, () => {
  const colorFn = nodeEnv === "production" ? chalk.green : chalk.red
  console.log(colorFn(`Running in ${nodeEnv} mode`))
  console.log(
    chalk.green("✔"),
    `Using ${process.env.SMTP_SERVER}:${process.env.SMTP_PORT} for email`
  )
  console.log(`Server is running on port ${port}`)
})
