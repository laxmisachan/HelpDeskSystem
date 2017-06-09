/**
 * Created by PCK on 20-May-17.
 */

/*
'use strict';
var async = require('async');
module.exports = function(app) {
  // data sources
  var mongoDs = app.dataSources.mongodbDS; // 'name' of your mongo connector, you can find it in datasource.json
  var mysqlDs = app.dataSources.mysqlDS;
  // create all models
  async.parallel({
    complainers: async.apply(createComplainers),
    areas: async.apply(createAreas),
  }, function(err, results) {
    if (err) throw err;
    createComplains(results.complainers, results.areas, function(err) {
      console.log('> models created sucessfully');
    });
  });
  // create complainers
  function createComplainers(cb) {
    mongoDs.automigrate('Complainer', function(err) {
      if (err) return cb(err);
      var Complainer = app.models.Complainer;
      Complainer.create([{
        email: 'foo@bar.com',
        password: 'foobar',
      }, {
        email: 'john@doe.com',
        password: 'johndoe',
      }, {
        email: 'jane@doe.com',
        password: 'janedoe',
      }], cb);
    });
  }
  // create areas
  function createAreas(cb) {
    mysqlDs.automigrate('Area', function(err) {
      if (err) return cb(err);
      var Area = app.models.Area;
      Area.create([{
        name: 'Janakpuri',
        city: 'New Delhi',
      }, {
        name: 'Badshahpur',
        city: 'Gurgaon',
      }, {
        name: 'Dwarka',
        city: 'New Delhi',
      }], cb);
    });
  }
  // create complains
  function createComplains(complainers, areas, cb) {
    mongoDs.automigrate('Complain', function(err) {
      if (err) return cb(err);
      var Complain = app.models.Complain;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      Complain.create([{
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        subject: 'Road',
        description: 'Lots of potholes',
        attachment: '',
        status: 'N',
        complainerID: complainers[0].id,
        areaID: areas[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        subject: 'Road',
        description: 'Lamp posts',
        attachment: '',
        status: 'N',
        complainerID: complainers[0].id,
        areaID: areas[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        subject: 'Road',
        description: 'Pavement',
        attachment: '',
        status: 'N',
        complainerID: complainers[0].id,
        areaID: areas[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        subject: 'Waste collection',
        description: 'Everyday instead of alternate days',
        attachment: '',
        status: 'N',
        complainerID: complainers[0].id,
        areaID: areas[0].id,
      }, {
        date: Date.now() - (DAY_IN_MILLISECONDS * 4),
        subject: 'Safety',
        description: 'Police patrolling at night',
        attachment: '',
        status: 'N',
        complainerID: complainers[0].id,
        areaID: areas[0].id,
      }], cb);
    // });
  // }
};

*/
