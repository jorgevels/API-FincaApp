const express = require('express');
const cors = require('cors');
const debug = require('debug')('app:server');
const app = express();

const { config } = require('./config/index');
const badgesApi = require('./routes/trabajos');
const ventasApi = require('./routes/ventas');

const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');

// middleware de CORs
app.use(cors());
app.options('*', cors());

// middleware de bodyparser
app.use(express.json());

// routes
badgesApi(app);
ventasApi(app);

// catch 404
app.use(notFoundHandler);
// Los middlewares de error, siempre tienen que ir al final de las rutas,
// las rutas también son middlewares
// **Menejadores de errores**

// errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// PENDIENTE COMPROBACION
// Cuando hagamos un request a nuestra aplicación, nos imprima un hello world

/* app.get('/', (req, res) => {
  res.json(
    'Hello word a API Badges Platzi, esta API funciona update 04-05-2020-'
  );
}); */

app.listen(config.port, () => {
  debug(`App linstening on http://localhost:${config.port}`);
});
