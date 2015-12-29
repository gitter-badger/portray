var characterize = require('./index');
var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');

// characterize
// .get('steam', 239030)
// .then(printResults)
// .catch(function (err) {
//     console.log(err);
// });



var query = {
  name: 'Super Mario World',
  platform: 'asuper-nintendo-snes'
};

characterize.findOne('thegamesdb', query)
.then(function(results) {
  console.log(results);
})
.catch(function(err) {
  console.log(err);
})

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
