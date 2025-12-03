/* eslint-disable no-console */
const http = require('http');

const stoppable = require('stoppable');
const { sequelize } = require('./db/models');

const app = require('./app');

const normalizePort = require('./utils/normalize-port');

const gracefulShutdown = require('./utils/graceful-shutdown');

const port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */

/**
 * Handle server errors.
 * @param {Error} error - The error to handle.
 * @throws {Error} - If the error is not a listen error or is not a known error code.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind}`);
}

server.on('error', onError);

sequelize.sync().then(() => {
  server.on('listening', onListening);
});
