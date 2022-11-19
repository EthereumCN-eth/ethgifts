import { readAndParseEnvFile } from "./utils"
import { existsSync } from "fs"
import { join } from "path"
import { DotenvParseOutput } from "dotenv"
import { ENV_FILE_NAME } from "./config"

export function notNull<TValue>(value: TValue | null): value is TValue {
  return value !== null
}

export const collectRootEnvRecord = (): Array<{
  fileName: string
  envObj: DotenvParseOutput
}> => {
  const cwd = process.cwd()
  return ENV_FILE_NAME.map((fileName) => {
    const envpath = join(cwd, fileName)
    if (existsSync(envpath)) {
      return {
        fileName,
        envObj: readAndParseEnvFile(envpath),
      }
    } else {
      return null
    }
  }).filter(notNull)
}
