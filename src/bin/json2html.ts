#!/usr/bin/env node

import { runScript } from '@naturalcycles/nodejs-lib/dist/script'
import { json2htmlCommand } from '../json2html'

runScript(async () => {
  await json2htmlCommand()
})
