import * as app from '../../../src/main'
import * as supertest from 'supertest'
import { logger } from '../../../src/common/logging/logger'

export abstract class AbstractControllerIntegrationTest {
    private static server: any = null
    private static apiClient: any = null

    protected apiClient: any = AbstractControllerIntegrationTest.apiClient
    protected logger: any = logger

    protected static before() {
        AbstractControllerIntegrationTest.server = app.default.express.app.listen(() => {})
        AbstractControllerIntegrationTest.apiClient = supertest.agent(
            AbstractControllerIntegrationTest.server
        )
        logger.debug('Test server successfully started.')
    }

    protected static after() {
        AbstractControllerIntegrationTest.server.close()
        logger.debug('Test server successfully teared down.')
    }
}
