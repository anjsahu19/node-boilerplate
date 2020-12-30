import { MainController } from '@controllers/main.controller'
import * as express from 'express'
const router = express.Router()

router.get('/main', MainController.index)

export default router