var characterize = require('./index');
var util = require('util');
var _ = require('lodash');
var chai = require('chai');
var Promise = require('bluebird');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
var expect = require('chai').expect;

// characterize
// .get('steam', 239030)
// .then(printResults)
// .catch(function (err) {
//     console.log(err);
// });

describe('characterize', function() {
  describe('find', function() {
    it('should be an array', function(done) {
      var query = {
        name: 'Super Mario World',
        platform: 'super-nintendo-snes'
      };

      characterize.find('thegamesdb', query)
      .then(function(results) {
          expect(results).to.be.an('array');
          done();
      })
      .catch(done);
    });
  });

  describe('findOne', function() {
    it('should be an object', function(done) {
      var query = {
        name: 'Super Mario World',
        platform: 'super-nintendo-snes'
      };

      characterize.findOne('thegamesdb', query)
      .then(function(results) {
          expect(results).to.be.an('object');
          done();
      })
      .catch(done);
    });
  });
});

// characterize
// .find('thegamesdb', {
//   platform: "super-nintendo-snes",
//   name: "Sonic the hedgehog"
// })
// .then(function(results) {
//   var bestMatch = _.max(results, function(o) {
//     return o.score;
//   });
//
//   return characterize.get('thegamesdb', bestMatch.id);
// })
// .then(printResults)
// .catch(function (err) {
//     console.log(err);
// });
//
// function printResults(data) {
//   console.log(
//    util.inspect(data, showHidden=false, depth=44, colorize=true)
//   );
// }
