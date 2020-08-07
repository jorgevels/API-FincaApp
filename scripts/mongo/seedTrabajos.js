// DEBUG=app:* node scripts/mongo/seedBadges.js
//para W10
// set DEBUG=app:* && node scripts/mongo/seedTrabajos.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:trabajos');
const MongoLib = require('../../lib/mongo');
const { trabajosMock } = require('../../utils/mocks/trabajos');

async function seedTrabajos() {
  try {
    const mongoDB = new MongoLib();

    const promises = trabajosMock.map(async (trabajo) => {
      delete trabajo.id;
      await mongoDB.create('trabajos', trabajo);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} badges have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedTrabajos();
