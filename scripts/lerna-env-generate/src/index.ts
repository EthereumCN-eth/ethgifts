#!/usr/bin/env node

import { collectRootEnvRecord } from "./collectRootEnvRecord"
import { computeOutputEnv } from "./computeOutputEnv"
import { parsePackages } from "./parsePackages"
import { writeEnvFile } from "./utils"
import chalk from "chalk"

const run = async () => {
  try {
    const packageParsedArray = parsePackages()
    const EnvRootValuesArray = collectRootEnvRecord()
    const computedPackageEnvArray = packageParsedArray.map(
      (packageParsedObj) => {
        const { envKeys, packageRoot, packageName } = packageParsedObj
        const computedEnvArray = EnvRootValuesArray.map((rootObj) => {
          const { envObj: rootEnvSource, fileName: rootEnvFileName } = rootObj
          if (envKeys) {
            const computedEnvObj = computeOutputEnv({
              templateKey: envKeys,
              rootkey: rootEnvFileName,
              rootRecord: rootEnvSource,
            })
            return computedEnvObj
          }
          return {
            envFileName: rootEnvFileName,
            envObj: null,
            hasAllKeys: null,
          }
        })
        return {
          packageName,
          packageRoot,
          computedEnvArray,
        }
      },
    )
    // console.log(computedPackageEnvArray)

    computedPackageEnvArray.forEach((packageObj) => {
      const { packageName, packageRoot } = packageObj
      console.log(`For package(${chalk.blue(packageName)}):`)
      packageObj.computedEnvArray.forEach((item) => {
        if (!item.envObj) {
          console.log(
            chalk.red(
              `${item.envFileName}: no env.example for package(${packageName})`,
            ),
          )
          return
        }
        const { envFileName, envObj, hasAllKeys } = item

        if (hasAllKeys) {
          writeEnvFile({
            packageRoot,
            packageName,
            envFileName,
            envObj,
          })
        } else {
          console.log(
            chalk.yellow(
              `${item.envFileName}: env keys(under root ${envFileName}) are not complete for package(${packageName})`,
            ),
          )
        }
      })
      console.log(`\n`)
    })
    // console.log(computedPackageEnvArray)
  } catch (error) {
    console.info(`No lerna packages installed.`)
    process.exit(0)
  }
}

run()
