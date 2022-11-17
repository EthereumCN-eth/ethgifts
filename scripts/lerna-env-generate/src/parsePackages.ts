import { readAndParseEnvFile } from "./utils"
import { execSync } from "child_process"
import { existsSync } from "fs"
import { join } from "path"
import { ENV_TEMPLATE_FILE_NAME } from "./config"
import { DotenvParseOutput } from "dotenv"

export type PackageObj = {
  location: string
  name: string
}

export type PackageParsedObj =
  | {
      fileName: string
      packageName: string
      packageRoot: string
      envObj: DotenvParseOutput
      envKeys: string[]
    }
  | {
      fileName: string
      packageName: string
      packageRoot: string
      envObj: null
      envKeys: null
    }

export const parsePackages = (): PackageParsedObj[] => {
  try {
    const output = execSync(`npx lerna ls -la --json`)
    const packages = JSON.parse(output.toString()) as Array<PackageObj>
    // console.log(packages)
    return packages.map((packageObj) => {
      const { location, name } = packageObj

      const packageEnvTemplatePath = join(location, ENV_TEMPLATE_FILE_NAME)
      if (existsSync(packageEnvTemplatePath)) {
        const envObj = readAndParseEnvFile(packageEnvTemplatePath)
        return {
          fileName: packageEnvTemplatePath,
          packageName: name,
          packageRoot: location,
          envObj,
          envKeys: Object.keys(envObj),
        }
      }
      return {
        fileName: packageEnvTemplatePath,
        packageName: name,
        packageRoot: location,
        envObj: null,
        envKeys: null,
      }
    })
  } catch (error) {
    console.info(`No lerna packages installed.`)
    process.exit(0)
  }
}
