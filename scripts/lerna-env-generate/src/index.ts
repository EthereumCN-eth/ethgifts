#!/usr/bin/env node
import { execSync } from "child_process"
import { existsSync } from "fs"
import { join } from "path"

type PackageObj = {
  location: string
}

const parsePackages = () => {
  try {
    const output = execSync(`npx lerna ls --json`)
    const packages = JSON.parse(output.toString()) as Array<PackageObj>
  } catch (error) {
    console.info(`No lerna packages installed.`)
    process.exit(0)
    return null
  }
}
const run = async () => {
  try {
    const output = execSync(`npx lerna ls --json`)
    return JSON.parse(output.toString()) as PackageObj
  } catch (error) {
    console.info(`No lerna packages installed.`)
    process.exit(0)
    return null
  }
}
run()
