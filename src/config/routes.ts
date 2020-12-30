import ApiRouter from '../routes/api.routes'

class RouterConfig {
  public static routes(router: any): any {
    router.use('/api/v1', ApiRouter)
  }
}

export default RouterConfig
