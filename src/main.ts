'use strict'

import 'dotenv/config'
import 'reflect-metadata'
import { Application } from './common/application'

export default new Application().configure().run()
