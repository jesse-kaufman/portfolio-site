import nodemailer from "nodemailer"

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

export const sendMail = async ({ name, email, phone, subject, message }) => {
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
  const info = await transporter.sendMail(mailOptions)
  console.log("Email sent:", info.response)
}
