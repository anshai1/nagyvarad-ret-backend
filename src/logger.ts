import winston from 'winston'
import express, { NextFunction, Request, Response } from 'express'

const {printf} = winston.format

const logFormat = printf(({level, message}) => {
  const date = new Date()
  const timestamp = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}]`
  return `${timestamp} ${level.toUpperCase()}: ${message}`
})

export const log = winston.createLogger({
  level: 'info',
  format: logFormat,
  defaultMeta: {service: 'user-service'},
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({filename: 'logs/error.log', level: 'error'}),
    new winston.transports.File({filename: 'logs/combined.log'})
  ]
})

export const traffic_logger = express.Router()
  .all('*', (req: Request, res: Response, next: NextFunction) => {
    log.log({
      level: 'info',
      message: `${req.method} ${req.path}`
    })
    next()
  })