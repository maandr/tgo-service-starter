import { AbstractControllerIntegrationTest } from './abstract.controller.integration.test'
import { suite, test } from 'mocha-typescript'
import { expect } from 'chai'

@suite('HealthController')
class HealthControllerIntegrationTest extends AbstractControllerIntegrationTest {
    @test('GET /api/health')
    should_response_ok() {
        this.apiClient.get('/api/health').expect(200)
    }
}
