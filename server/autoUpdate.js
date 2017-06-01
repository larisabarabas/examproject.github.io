var app = require('./orbiz-server');
var ds = app.dataSources.db;
ds.autoupdate(function (err, done) {
  console.log("Performed autoupdate");
  console.log(err, done);
  process.exit(0);
});