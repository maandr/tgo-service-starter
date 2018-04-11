import { ApplicationConfig } from '../config/config'
import * as winston from 'winston'

let transporters: winston.TransportInstance[] = [
    new winston.transports.Console({
        timestamp: true,
        level: ApplicationConfig.get('logging.level').toLocaleLowerCase()
    })
]

if (process.env.NODE_ENV === 'production') {
    transporters.push(
        new winston.transports.File({
            level: ApplicationConfig.get('logging.level').toLocaleLowerCase(),
            filename: 'application.log',
            zippedArchive: true,
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
            maxFiles: '14d'
        })
    )
}

export const logger = new winston.Logger({
    transports: transporters
})
