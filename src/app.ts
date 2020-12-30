import express, { Request, Response } from 'express'
import bodyParser from 'body-parser' // used to parse the form data that you pass in the request
import cookieParser from 'cookie-parser'
import compression from 'compression'
import dotenv from 'dotenv'
import path from 'path'
import { rootPath } from '../root'
import cors from 'cors'
import helmet from 'helmet'
// import Auth from './config/auth'
import Bootstrap from './config/bootstrap'
import Middleware from './config/middleware'
import RouterConfig from './config/routes'
import Settings from './config/settings'
import ResponseProvider from './providers/response.provider'
import AppRouter from './config/routes'
import MySqlDB from './config/db'

export default class App {
  public app: express.Application
  protected router: AppRouter
  protected port: any
  constructor() {
    this.loadEnv()
    this.app = express() // run the express instance and store in app
    this.port = process.env.PORT || Settings.PORT
    this.init()
  }

  private async loadEnv() {
    let env = path.join(rootPath, '.env')
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === 'production') {
      env = path.join(rootPath, '.env.prod')
    }
    console.log(rootPath, env)
    const processEnv = dotenv.config({ path: env })
    console.log(processEnv)
  }
  private async init() {
    await this.setMysqlConfig()
    this.config(this.app)

    ResponseProvider.init()
  }
  private config(app): void {
    // Auth.init()
    app.use(compression())
    // middlewares
    // app.use(helmet())
    // app.use(function (req, res, next) {
    //   frameguard({
    //     action: 'allow-from',
    //     domain: String(req.query.domain)
    //   })(req, res, next)
    // })
    // app.use(helmet.contentSecurityPolicy({
    //   directives: {
    //     "default-src": ["'none'"],
    //     "script-src": ["'none'"],
    //     "object-src": ["'none'"],
    //   },
    // }));
    // app.use(helmet.dnsPrefetchControl());
    // app.use(helmet.expectCt());
    // app.use(helmet.hsts());
    // app.use(helmet.ieNoOpen());
    // app.use(helmet.noSniff());
    // app.use(helmet.permittedCrossDomainPolicies());
    // app.use(helmet.referrerPolicy());
    // app.use(helmet.xssFilter());
    // app.use(frameguard({
    //   action: 'allow-from',
    //   domain: '*'
    // }))
    // support application/json type post data
    app.use(bodyParser.json())
    // support application/x-www-form-urlencoded post data
    app.use(
      bodyParser.urlencoded({
        extended: false,
      })
    )

    app.use(cookieParser())
    // Enables cors
    app.use(cors())

    this.configRoutes(app)
    // error handling
    this.initErrorHandling(app)
    Bootstrap.init()
    this.listen()
  }
  private async setMysqlConfig() {
    try {
      await MySqlDB.setMysqlConfig()
    } catch (error) {
      console.error('Unable to connect to the database:', error)
    }
  }
  private configRoutes(app: express.Application) {
    Middleware.routes(app)
    RouterConfig.routes(app)
  }
  private initErrorHandling(app: express.Application) {
    const isProduction = process.env.NODE_ENV === 'production'

    isProduction ? app.set('env', 'production') : app.set('env', 'development')

    app.use(express.static(path.join(process.cwd(), 'public')))

    app.use(express.static('public'))
    app.use((req, res, next) => {
      res.sendFile(path.join(process.cwd(), 'public', 'index.html'))
    })
    app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const err: any = new Error('Not A Valid url')
        err.status = 404
        next(err)
      }
    )
    // console.log(app._router.stack);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening ${this.port}`)
    })
  }
}

const server: App = new App()
