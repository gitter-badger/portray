var Promise = require("bluebird");
var _ = require("lodash");
var path = require("path");

// Parse Datomatic XML fies for CRC
// //datafile/game/rom[@crc='E359F184']/..

// exports.get = function(source, appid) {
//     return require('./extractor/' + source)
//     .parse(appid)
//     .catch(function (err) {
//         console.log(err);
//     });
// };

function sortScoreDesc(collection) {
  return _.sortByOrder(collection, ['score'], 'dec');
}

function scrubName(basename) {
    return path.parse(basename).name.replace(/(?:\ {1,}|[^a-zA-Z0-9])/gi, ' ');
}

function ExtractorException(message) {
  this.name = "ExtractorException";
  this.message = message;
  this.stack = (new Error()).stack;
}
ExtractorException.prototype = new Error;


exports.find = function(source, query) {
    var extractor = null;

    try {
        var extractor = require('./extractor/' + source);
    }
    catch (e) {
        var msg = "No extractor for source:'" + source + "' exists";
        var error = new ExtractorException(msg);
        return Promise.reject(error);
    }

    query.name = scrubName(query.name);

    return extractor
    .find(query)
    .then(sortScoreDesc)
    .catch(function (err) {
        console.log(err);
    });
};

exports.findOne = function(source, query) {
    var extractor = null;

    try {
        var extractor = require('./extractor/' + source);
    }
    catch (e) {
        var msg = "No extractor for source:'" + source + "' exists";
        var error = new ExtractorException(msg);
        return Promise.reject(error);
    }

    return extractor
    .findOne(query)
    .then(sortScoreDesc)
    .catch(function (err) {
        console.log(err);
    });
};

exports.get = function(source, id) {
    var extractor = null;

    try {
        var extractor = require('./extractor/' + source);
    }
    catch (e) {
        var msg = "No extractor for source:'" + source + "' exists";
        var error = new ExtractorException(msg);
        return Promise.reject(error);
    }

    return extractor
    .get(id)
    .catch(function (err) {
        console.log(err);
    });
};
