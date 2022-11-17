import chalk from "chalk"
import dotenv, { DotenvParseOutput } from "dotenv"
import { readFileSync } from "fs"
import { writeFileSync } from "fs"
import { join } from "path"

export const readAndParseEnvFile = (path: string) => {
  return dotenv.parse(
    readFileSync(path, {
      encoding: "utf8",
      flag: "r",
    }),
  )
}

/** Turn an object into an envfile string. */
export function stringifyToEnvFile(obj: DotenvParseOutput): string {
  let result = ""
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      const line = `${key}=${String(value)}`
      result += line + "\n"
    }
  }
  return result
}

export const writeEnvFile = ({
  packageRoot,
  envFileName,
  envObj,
  packageName,
}: {
  packageRoot: string
  envFileName: string
  envObj: DotenvParseOutput
  packageName: string
}) => {
  const toPath = join(packageRoot, envFileName)
  writeFileSync(toPath, stringifyToEnvFile(envObj))
  console.log(
    chalk.green(
      `${envFileName}: written ${envFileName}  to package(${packageName}) root`,
    ),
  )
}
