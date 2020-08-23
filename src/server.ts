import dotenv from 'dotenv'
import 'reflect-metadata'
import './database'
import app from './app'

dotenv.config()

app.listen(process.env.PORT || 3000, () => console.log('Running server.....'))
