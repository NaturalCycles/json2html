export enum JSON_TYPE {
  UNDEFINED = 'undefined',
  NULL = 'null',
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
  OBJECT = 'object',
  OTHER = 'other',
}

export type Formatter<T = any> = (v: T, level: number) => string
