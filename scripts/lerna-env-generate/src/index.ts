#!/usr/bin/env node

import { collectRootEnvRecord } from "./collectRootEnvRecord"
import { computeOutputEnv } from "./computeOutputEnv"
import { parsePackages } from "./parsePackages"
import { writeEnvFile } from "./utils"

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
          return null
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
      packageObj.computedEnvArray.forEach((item) => {
        if (!item) {
          console.log(`no env.example for package(${packageName})`)
        }
        if (item) {
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
              `env keys(under root ${envFileName}) are not complete for package(${packageName}); no auto env generation for package(${packageName})`,
            )
          }
        }
      })
    })
    // console.log(computedPackageEnvArray)
  } catch (error) {
    console.info(`No lerna packages installed.`)
    process.exit(0)
  }
}

run()
