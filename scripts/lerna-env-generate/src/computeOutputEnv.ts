import { DotenvParseOutput } from "dotenv"

export const computeOutputEnv = ({
  templateKey,
  rootkey,
  rootRecord,
}: {
  templateKey: string[]
  rootkey: string
  rootRecord: DotenvParseOutput
}): {
  envFileName: string
  envObj: DotenvParseOutput
  hasAllKeys: boolean
} => {
  const hasAllKeys = templateKey.every((v) =>
    Object.keys(rootRecord).includes(v),
  )
  const envObj = templateKey.reduce((acc, key) => {
    if (key in rootRecord) {
      return {
        ...acc,
        [key]: rootRecord[key],
      }
    }
    return acc
  }, {})
  return {
    envFileName: rootkey,
    envObj,
    hasAllKeys,
  }
}
