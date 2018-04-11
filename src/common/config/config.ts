import * as applicationConfig from 'config'

export abstract class ApplicationConfig {
    static has(property: string): boolean {
        return applicationConfig.has(property)
    }

    static get(property: string): string {
        if (!applicationConfig.has(property)) {
            throw new ConfigurationError(`
                Property '${property}' is not configured.
                Make sure it is specified in the config/${process.env.NODE_ENV}.yml.
            `)
        }
        return applicationConfig.get(property)
    }
}

export class ConfigurationError extends Error {}
