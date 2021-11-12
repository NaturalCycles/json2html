import * as fs from 'fs-extra'
import { JsonValue } from 'type-fest'
import { json2html } from './json2html'
import { testDir } from './paths.cnst'

const mock1 = require(`${testDir}/mock1.json`) as JsonValue

test('test1', async () => {
  const html = json2html(mock1)
  // console.log(html)
  fs.writeFileSync(`${testDir}/mock1.html`, html)
})
