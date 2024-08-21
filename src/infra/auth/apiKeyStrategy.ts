// apiKeyStrategy.ts
import passport from 'passport'
import { HeaderAPIKeyStrategy } from 'passport-headerapikey'
import { AuthService } from './authService'

const authService = new AuthService()

passport.use(
  new HeaderAPIKeyStrategy(
    { header: 'X-API-KEY', prefix: '' },
    true,
    (apiKey: string, done: (error: any, user?: any) => void) => {
      if (authService.validate(apiKey)) {
        return done(null, true)
      }
      return done(null, false)
    }
  )
)

export default passport
