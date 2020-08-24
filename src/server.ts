import dotenv from 'dotenv'
import 'reflect-metadata'
import './database'
import app from './app'
import logger from './logger'

dotenv.config()

app.listen(process.env.PORT || 3000, () => logger.info('Running server.....'))
