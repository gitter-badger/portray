var characterize = require('./main');
var util = require('util');

characterize.get('steam', 239030).then(printResults)
.catch(function (err) {
    console.log(err);
});;

function printResults(data) {
  console.log(
   util.inspect(data, showHidden=false, depth=4, colorize=true)
  );
}
