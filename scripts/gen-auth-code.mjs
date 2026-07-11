import jwt from 'jsonwebtoken'

const email = 'local-test@example.com'
const secret = 'local-dev-email-secret'

const code = jwt.sign(
  { email, exp: Math.floor(Date.now() / 1000) + 20 * 60 },
  secret,
)

console.log(code)
