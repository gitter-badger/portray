var characterize = require('./main');
var util = require('util');

characterize.getMetaData(239030).then(printResults);

function printResults(data) {
  console.log(
   util.inspect(data, showHidden=false, depth=4, colorize=true)
  );
}
