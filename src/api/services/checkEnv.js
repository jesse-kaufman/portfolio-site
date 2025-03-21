export const checkEnv = (colorFn) => {
  const requiredVars = ["SMTP_SERVER", "SMTP_PORT"]

  for (const requiredVar of requiredVars) {
    if (!process.env[requiredVar]) {
      const msg = `The ${requiredVar} environment variable must be set.`
      console.error(colorFn(msg))
      process.exit(1)
    }
  }
}
