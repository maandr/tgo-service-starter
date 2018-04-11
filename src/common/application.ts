import { ApplicationConfig } from './config/config'
import { ExpressApplication } from './express'
import { logger } from './logging/logger'
import * as config from 'config'
import * as http from 'http'

export class Application {
    port: number
    server: http.Server

    constructor(public express: ExpressApplication = new ExpressApplication()) {}

    configure(): Application {
        logger.info(`configuring application..`)
        this.port = parseInt(ApplicationConfig.get('express.port'))
        return this
    }

    run(): Application {
        this.server = this.express.app.listen(this.port, (error: any) => {
            if (error) {
                logger.error(`Application startup failed.`)
                logger.error(error)
            } else {
                logger.info(`Server started successfully.`)
            }
        })
        return this
    }
}
