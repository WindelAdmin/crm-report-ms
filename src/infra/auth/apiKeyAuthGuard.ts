// apiKeyAuthGuard.ts
import { NextFunction, Request, Response } from 'express'
import passport from './apiKeyStrategy'

const apiKeyAuthGuard = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('headerapikey', { session: false }, (err: any, user: any, info: any) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    next()
  })(req, res, next)
}

export default apiKeyAuthGuard
