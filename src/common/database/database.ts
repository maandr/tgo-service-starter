import * as MySQL from 'mysql'
import { logger } from '../logging/logger'
import { DatabaseConfigProvider, IDatabaseConfig } from './database.config'

export interface IDatabase {
    query(statement: string): Promise<any>
}

export class Database implements IDatabase {
    private connection: MySQL.Connection

    constructor(private config: IDatabaseConfig) {
        this.connection = MySQL.createConnection({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database
        })
        this.connection.connect()
    }

    public async query(statement: string): Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            logger.info('SQL: ' + statement)
            this.connection.query(
                statement,
                (error: MySQL.MysqlError, results?: any, fields?: MySQL.FieldInfo[]) => {
                    if (error) {
                        logger.error(error.message)
                        reject(error)
                    }
                    if (results == null) {
                        reject('No results')
                    }
                    resolve(results)
                }
            )
        })
    }
}
