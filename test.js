var characterize = require('./index');
var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
require("string_score");

// console.log(
//   "Super Mario Bros. 2".score("Super Mario Bros 2", 1),
//   "Super Mario Bros 2".score("Super Mario Bros. 2", 1)
// );

// characterize
// .get('steam', 239030)
// .then(printResults)
// .catch(function (err) {
//     console.log(err);
// });

// function onlyResolved(arr) {
//   return Promise.all(arr.map(function(el) {
//       return el.reflect();
//   }))
//   .filter(function(p){
//       return p.isFulfilled();
//   })
//   .then(function (result) {
//     return Promise.mapSeries(result, function(item) {
//       return item.value();
//     });
//   });
// }
//
// var arr = [
//   new Promise(function(res, rej) {
//     res('a');
//   }),
//   Promise.reject(new Error("Platform 'hlfdss-df' not supported")),
//   Promise.resolve('yay 2'),
// ];
//
// onlyResolved(arr)
// .then(function (result) {
//   console.log(result);
// })
// .catch(function (err) {
//   console.error('Error:', err);
//   console.log('handled the error');
// })


// var query = {
//   name: 'Super Mario World',
//   platform: 'asuper-nintendo-snes'
// };
//
// characterize.findOne('thegamesdb', query)
// .then(function(results) {
//   console.log(results);
// })
// .catch(function(err) {
//   console.log(err);
// })

// characterize
// .find('thegamesdb', {
//   platform: "super-nintendo-snes",
//   name: "super-mario-world.ext"
// })
// .then(function(results) {
//   var bestMatch = _.max(results, function(o) {
//     return o.score;
//   });
//
//   return characterize.get('thegamesdb', bestMatch.id);
// })
characterize
.get('thegamesdb', 25913)
.then(printResults)
.catch(function (err) {
    console.log(err);
});

function printResults(data) {
  console.log(
   util.inspect(data, showHidden=false, depth=44, colorize=true)
  );
}
