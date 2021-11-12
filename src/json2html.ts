import { _since, AnyObject, pMap, StringMap } from '@naturalcycles/js-lib'
import * as fs from 'fs-extra'
import * as globby from 'globby'
import * as yargs from 'yargs'
import { Formatter, JsonType } from './json2html.model'
import { wrapHtml } from './tmpl'

const FORMATTERS: StringMap<Formatter> = {
  [JsonType.UNDEFINED]: undefinedFormatter,
  [JsonType.NULL]: nullFormatter,
  [JsonType.STRING]: stringFormatter,
  [JsonType.NUMBER]: numberFormatter,
  [JsonType.BOOLEAN]: booleanFormatter,
  [JsonType.ARRAY]: arrayFormatter,
  [JsonType.OBJECT]: objectFormatter,
}

const DEF_FORMATTER: Formatter = stringFormatter

export async function json2htmlCommand(): Promise<void> {
  const started = Date.now()

  const { argv } = yargs.demandCommand(1).options({
    debug: {
      type: 'boolean',
    },
  })
  const { _: inputPatterns, debug } = argv

  if (debug) console.log({ argv })

  const inputFiles = globby.sync(inputPatterns as string[])
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

  console.log(`json2html saved ${inputFiles.length} file(s) in ${_since(started)}`)
}

export function json2html(json: any): string {
  return wrapHtml(jsonValueToHtml(json, 1))
}

export function jsonValueToHtml(json: any, level: number): string {
  const type = getType(json)
  const formatter = FORMATTERS[type] || DEF_FORMATTER
  return formatter(json, level)
}

function getType(json: any): JsonType {
  if (json === undefined) return JsonType.UNDEFINED
  if (json === null) return JsonType.NULL
  if (typeof json === 'string') return JsonType.STRING
  if (typeof json === 'number') return JsonType.NUMBER
  if (typeof json === 'boolean') return JsonType.BOOLEAN
  if (Array.isArray(json)) return JsonType.ARRAY
  if (typeof json === 'object') return JsonType.OBJECT
  return JsonType.OTHER
}

function undefinedFormatter(): string {
  return `<div class="jsonType jsonType--undefined">undefined</div>`
}

function nullFormatter(): string {
  return `<div class="jsonType jsonType--null">null</div>`
}

function stringFormatter(v: string): string {
  return `<div class="jsonType jsonType--string">${String(v)}</div>`
}

function objectKeyFormatter(v: string): string {
  return `<div class="jsonType jsonType--objectKey">${String(v)}</div>`
}

function numberFormatter(v: number): string {
  return `<div class="jsonType jsonType--number">${String(Number(v))}</div>`
}

function booleanFormatter(v: boolean): string {
  return `<div class="jsonType jsonType--boolean">${String(Boolean(v))}</div>`
}

function arrayFormatter(a: any[], level: number): string {
  return [
    `<div class="jsonType jsonType--array jsonType--level${level}">`,
    a.map(v => jsonValueToHtml(v, level)).join(`<div class="jsonType--arraySpace"></div>`),
    `</div>`,
  ].join('\n')
}

function objectFormatter(o: AnyObject, level: number): string {
  return [
    `<table class="jsonType jsonType--object jsonType--level${level}">`,
    ...Object.entries(o).map(([k, v]) => {
      const type = getType(v)
      const of = type === JsonType.ARRAY && (v as any[]).length ? getType((v as any[])[0]) : ''

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
