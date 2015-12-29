var characterize = require('./index');
var util = require('util');
var _ = require('lodash');
var chai = require('chai');
var Promise = require('bluebird');
var expect = require('chai').expect;
var assert = require("assert");

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

    it("should return an emepty array when nothing is found", function(done) {
        var query = {
          name: '89asd98yfy0wyh74f87whf0a87rfha87fh',
          platform: 'super-nintendo-snes'
        };

        return characterize
        .find('thegamesdb', query)
        .then(function(results) {
            expect(results).to.be.empty;
            done();
        })
        .catch(done);
    });
  });

  describe('findOne', function() {
    var query = {};

    beforeEach(function() {
      query = {
        name: 'Super Mario World',
        platform: 'super-nintendo-snes'
      };
    });

    it('should be an object', function(done) {
      return characterize
      .findOne('thegamesdb', query)
      .then(function(results) {
          expect(results).to.be.an('object');
          done();
      })
      .catch(done);
    });

    it("should return an Error when called without specifying an extractor", function() {
        return characterize.findOne('', query)
        .catch(function(e) {
            assert.equal(e.name, "ExtractorException");
        });
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
