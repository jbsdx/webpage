'use strict';
const express = require('express');
const compression = require('compression');

const _port = 3000;
const _app_folder = 'dist/client';

const app = express();
app.use(compression());

// match files containing dots
app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// match the rest
app.all('*', function(req, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

app.listen(_port, function() {
  console.log(
    'Node Express server for ' +
      app.name +
      ' listening on http://localhost:' +
      _port,
  );
});
