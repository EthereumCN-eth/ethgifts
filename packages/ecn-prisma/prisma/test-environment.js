const NodeEnvironment = require("jest-environment-node").default;
const randomString = require("randomstring");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const { PrismaClient } = require("@prisma/client");

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);

    // Generate a unique schema identifier for this test context
    this.schema = `test_${randomString.generate({
      length: 16,
      charset: "alphanumeric",
      capitalization: "lowercase",
    })}`;

    // Generate the pg connection string for the test schema
    this.databaseUrl = process.env.DATABASE_TEST_URL;
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;
    this.client = new PrismaClient();
  }

  async setup() {
    // Set the required environment variable to contain the connection string
    // to our database test schema
    console.log("jest test-environment setting up...");
    const url = `${process.env.DATABASE_TEST_URL}?schema=${this.schema}`;
    process.env.DATABASE_URL = url;
    this.global.process.env.DATABASE_URL = url;

    await exec("yarn prisma migrate deploy");
    return super.setup();
  }

  async teardown() {
    // Drop the schema after the tests have completed
    await this.client.$executeRawUnsafe(
      `drop schema if exists "${this.schema}" cascade`
    );
    await this.client.$disconnect();
  }
}

module.exports = PrismaTestEnvironment;
