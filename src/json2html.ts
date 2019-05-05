import { StringMap } from '@naturalcycles/js-lib'
import { pMap } from '@naturalcycles/promise-lib'
import * as fs from 'fs-extra'
import globby from 'globby'
import { JsonArray, JsonObject, JsonValue } from 'type-fest'
import * as yargs from 'yargs'
import { Formatter, JSON_TYPE } from './json2html.model'
import { wrapHtml } from './tmpl'

const FORMATTERS: StringMap<Formatter> = {
  [JSON_TYPE.UNDEFINED]: undefinedFormatter,
  [JSON_TYPE.NULL]: nullFormatter,
  [JSON_TYPE.STRING]: stringFormatter,
  [JSON_TYPE.NUMBER]: numberFormatter,
  [JSON_TYPE.BOOLEAN]: booleanFormatter,
  [JSON_TYPE.ARRAY]: arrayFormatter,
  [JSON_TYPE.OBJECT]: objectFormatter,
}

const DEF_FORMATTER: Formatter = stringFormatter

export async function json2htmlCommand (): Promise<void> {
  const d = Date.now()
  const { argv } = yargs.demandCommand(1).options({
    debug: {
      type: 'boolean',
    },
  })
  const { _: inputPatterns, debug } = argv
  if (debug) console.log({ argv })

  const inputFiles = await globby(inputPatterns)
  if (!inputFiles.length) {
    console.log(`json2html found 0 files matching input patterns: ${inputPatterns.join(' ')}`)
    process.exit(1)
  }

  await pMap(inputFiles, async inputFile => {
    const json = await fs.readJson(inputFile)
    const html = json2html(json)
    const outFile = `${inputFile}.html`
    await fs.writeFile(outFile, html)
  })

  console.log(`json2html saved ${inputFiles.length} file(s) in ${Date.now() - d} ms`)
}

export function json2html (json: JsonValue): string {
  return wrapHtml(jsonValueToHtml(json, 1))
}

export function jsonValueToHtml (json: JsonValue, level: number): string {
  const type = getType(json)
  const formatter = FORMATTERS[type] || DEF_FORMATTER
  return formatter(json, level)
}

function getType (json: JsonValue): JSON_TYPE {
  if (json === undefined) return JSON_TYPE.UNDEFINED
  if (json === null) return JSON_TYPE.NULL
  if (typeof json === 'string') return JSON_TYPE.STRING
  if (typeof json === 'number') return JSON_TYPE.NUMBER
  if (typeof json === 'boolean') return JSON_TYPE.BOOLEAN
  if (Array.isArray(json)) return JSON_TYPE.ARRAY
  if (typeof json === 'object') return JSON_TYPE.OBJECT
  return JSON_TYPE.OTHER
}

function undefinedFormatter (): string {
  return `<div class="jsonType jsonType--undefined">undefined</div>`
}

function nullFormatter (): string {
  return `<div class="jsonType jsonType--null">null</div>`
}

function stringFormatter (v: string): string {
  return `<div class="jsonType jsonType--string">${String(v)}</div>`
}

function objectKeyFormatter (v: string): string {
  return `<div class="jsonType jsonType--objectKey">${String(v)}</div>`
}

function numberFormatter (v: number): string {
  return `<div class="jsonType jsonType--number">${String(Number(v))}</div>`
}

function booleanFormatter (v: boolean): string {
  return `<div class="jsonType jsonType--boolean">${String(Boolean(v))}</div>`
}

function arrayFormatter (a: JsonArray, level: number): string {
  return [
    `<div class="jsonType jsonType--array jsonType--level${level}">`,
    a.map(v => jsonValueToHtml(v, level)).join(`<div class="jsonType--arraySpace"></div>`),
    `</div>`,
  ].join('\n')
}

function objectFormatter (o: JsonObject, level: number): string {
  return [
    `<table class="jsonType jsonType--object jsonType--level${level}">`,
    ...Object.entries(o).map(([k, v]) => {
      const type = getType(v)
      const of =
        type === JSON_TYPE.ARRAY && (v as JsonArray).length ? getType((v as JsonArray)[0]) : ''

      return [
        `<tr data-key="${k}" data-type="${type}" data-of="${of}">`,
        `<td class="jsonType--key">${objectKeyFormatter(
          k,
        )}</td><td class="jsonType--value">${jsonValueToHtml(v, level + 1)}</td>`,
        `</tr>`,
      ].join('\n')
    }),
    `</table>`,
  ].join('\n')
}
