import cors from "cors"
import express from "express"
import nodemailer from "nodemailer"
import chalk from "chalk"
import { checkEnv } from "./services/checkEnv.js"

process.env.NODE_ENV = process.env.NODE_ENV || "development"

// Check that environment variables are set correctly.
checkEnv(chalk.red)

const app = express()
const port = process.env.PORT || 3000
const smtpPort = process.env.SMTP_PORT
const smtpServer = process.env.SMTP_SERVER
const corsOrigin = process.env.CORS_ORIGIN

const requiredEnvVars = ["MAIL_HOST", "MAIL_PORT", "MAIL_USER", "MAIL_PASS"]

// Configure CORS to allow only requests from 'www.jessekaufman.com'
const corsOptions = {
  origin: corsOrigin, // Only allow this origin
  methods: "POST", // Limit allowed methods (optional, for security)
  allowedHeaders: "Content-Type", // Limit allowed headers (optional)
}
app.use(cors(corsOptions))

// Middleware to parse incoming JSON requests
app.use(express.json())

// Automatically parse URL-encoded payloads
app.use(express.urlencoded({ extended: true }))

// API endpoint to handle contact form submissions
app.post("/contact/v1", (req, res) => {
  // Configure nodemailer transport with encryption (SSL or TLS)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER, // Your local mail server address (use 'localhost' for local)
    port: process.env.SMTP_PORT, // Port for SSL (usually 465 or 587 for TLS)
    secure: true, // Use SSL/TLS
    auth: {
      user: "", // Leave empty if no authentication is required
      pass: "", // Leave empty if no authentication is required
    },
  })

  const { name, email, phone, subject, message } = req.body

  // Input validation
  if (!name || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." })
  }

  // Setup email data
  const mailOptions = {
    to: "youremail@example.com", // Recipient address
    subject: subject, // Subject line
    text: `Message from ${name} (${email}):\n\nPhone: ${phone}\n\n${message}`, // Plain text body
    html: `<p>Message from ${name} (${email}):</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Message:</strong><br/>${message}</p>`, // HTML body
    replyTo: email, // Use sender email for reply-to header
  }

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error)
      return res
        .status(500)
        .json({ error: "Something went wrong. Please try again later." })
    }

    console.log("Email sent:", info.response)
    res
      .status(200)
      .json({ message: "Your message has been sent successfully!" })
  })
})

// Start the server
app.listen(port, () => {
  const colorFn = nodeEnv === "production" ? chalk.green : chalk.red
  console.log(colorFn(`Running in ${nodeEnv} mode`))
  console.log(`${chalk.green("✔")} Using ${smtpServer}:${smtpPort} for email`)
  console.log(`Server is running on port ${port}`)
})
