import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import * as bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import { log, traffic_logger } from './logger'
import database from '../database/database'
import router from './router'
import { initDB } from '../database/surrealdb'

dotenv.config()
const PORT = process.env.PORT || '8085'

const app: Application = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(traffic_logger)
app.use(router)
const startup = () => app.listen(PORT, () => log.info(`Application started on PORT: ${PORT}`))

// database.authenticate()
//   .then(auth => startup())
//   .catch(error => log.error(`Application failed to start, ERROR: ${error.message}`))

initDB()
startup()
