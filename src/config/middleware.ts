import loggerMiddleware from '../middlewares/logger'
// import { validateLinkedInToken, validateToken } from '../middlewares/token'
// import updateLastActivity from '../middlewares/userLastActivity'
// import vaidateCompany from '../middlewares/validateCompany'

class Middleware {
  public static routes(app: any): void {
    app.all('*', loggerMiddleware)
    // app.all('/api/v1/*', validateToken, vaidateCompany, updateLastActivity)
    // app.all('/api/v1/validateLinkedinToken', validateLinkedInToken)
  }
}

export default Middleware
