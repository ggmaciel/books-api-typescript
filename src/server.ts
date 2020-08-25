import dotenv from 'dotenv'
import 'reflect-metadata'
import './database'
import connection from './database/connection'
import app from './app'
import logger from './logger'

dotenv.config()

enum ExitStatus {
    Failure = 1,
    Success = 0
}

process.on('unhandledRejection', (reason, promise) => {
    logger.error(
        `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
    )
    // lets throw the error and let the uncaughtException handle below handle it
    throw reason
})

process.on('uncaughtException', (error) => {
    logger.error(`App exiting due to an uncaught exception: ${error}`)
    process.exit(ExitStatus.Failure)
})

try {
    const server = app.listen(process.env.PORT || 3000, () => logger.info('Running server.....'))

    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT']
    exitSignals.map(sig => process.on(sig, async () => {
        try {
            server.close()
            await connection.close()
            logger.info('App exited with success')
            process.exit(ExitStatus.Success)
        } catch (err) {
            logger.error(`App exited with error ${err}`)
            process.exit(ExitStatus.Failure)
        }
    }))
} catch (err) {
    logger.error(`App exited with error: ${err}`)
    process.exit(ExitStatus.Failure)
}
