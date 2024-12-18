import * as jose from 'jose'
import { responseStatus } from '../utils/response'

export async function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({ status: responseStatus.UNAUTHORIZED })
    }

    // TODO: Check if token is blacklisted

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const { payload } = await jose.jwtVerify(token, secret)

    req.user = payload
    next()
  } catch (error) {
    res
      .status(401)
      .json({ status: responseStatus.UNAUTHORIZED, message: error.message })
  }
}
