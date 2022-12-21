import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { log, traffic_logger } from './logger'
import router from './router'
import database from '../database/database'

dotenv.config()
const PORT = process.env.PORT || '8085'

const app: Application = express()
  .use(bodyParser.urlencoded({extended: true}))
  .use(bodyParser.json())
  .use(cors())
  .use(helmet())
  .use(traffic_logger)
  .use(router)

const startup = () => app.listen(PORT, () => log.info(`Application started on PORT: ${PORT}`))

database.authenticate()
  .then(auth => database.sync({force: true}))
  .then(synced => startup())
  .catch(error => log.error(`Application failed to start, ERROR: ${error.message}`))