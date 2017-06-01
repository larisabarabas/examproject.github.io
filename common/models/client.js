'use strict';

module.exports = function(Client) {

var _    = require('lodash'),
async    = require('async'),
csv      = require('fast-csv'),
fork     = require('child_process').fork,
fs       = require('fs'),
path     = require('path'),
loopback = require('loopback');

Client.upload = function(req,callback) {
  Client.import_handleLine = function(ctx, line, uploadData) {
    return this.import_validateLine(line).then((function(_this) {
      return function() {
        return _this.createInvoice(ctx, line);
      };
    })(this));
  };
  return Client.createClient = function(ctx, line) {
    return Client.findOne({
      where: {
        CVR: req.body.CVR
      }
    }, ctx).then(function(found) {
      if (found) {
      var clients = [];
      client = {
        CVR: line.CVR,
        name: line.Name,
        address: line.Address,
        financeEmail: line.Email,
        phoneNo:line.PhoneNumber,
        lastInvoice: line.LastInvoice
      };
      }
      return Client.upsert(invoice, ctx);
    });
  };
};

Client.remoteMethod(
  'upload',
  {
    description: 'Upload CSV file with company data',
    http: {path:'/upload', verb: 'post'},
    accepts:{arg:'req', type:'object', http: { source:'req' } }
  }
);

};
