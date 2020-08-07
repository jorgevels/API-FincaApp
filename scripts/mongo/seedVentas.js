// DEBUG=app:* node scripts/mongo/seedBadges.js
//para W10
// set DEBUG=app:* && node scripts/mongo/seedVentas.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:ventas');
const MongoLib = require('../../lib/mongo');
const { ventasMock } = require('../../utils/mocks/ventas');

async function seedVentas() {
  try {
    const mongoDB = new MongoLib();

    const promises = ventasMock.map(async (venta) => {
      delete venta.id;
      await mongoDB.create('ventas', venta);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} Ventas have been created Succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedVentas();
