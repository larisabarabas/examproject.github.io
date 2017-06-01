'use strict';

var server = require('../server.coffee');
var options = JSON.parse(process.argv[2]);

try {
  server.models.options.model.import(options.container, options.file, options, function(err) {
    if (err) {
      console.error(err);
    }
    return process.exit(err ? 1 : 0);
  });
} catch (_error) {
  err = _error;
  console.error(err);
  process.exit(err ? 1 : 0);
}
