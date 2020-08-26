import express from 'express'
import routes from './routes'
import cors from 'cors'
import expressPino from 'express-pino-logger'
import logger from './logger'

const app = express()
app.use(express.json())
app.use(expressPino({
    logger
}))
app.use(routes)
app.use(cors({
    origin: '*'
}))

//

export default app
