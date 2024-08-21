export class AuthService {
  constructor() {}

  validate(apiKey: string): boolean {
    return apiKey === (process.env.API_KEY as string)
  }
}
