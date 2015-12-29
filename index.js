var Promise = require("bluebird");

// Parse Datomatic XML fies for CRC
// //datafile/game/rom[@crc='E359F184']/..

// exports.get = function(source, appid) {
//     return require('./extractor/' + source)
//     .parse(appid)
//     .catch(function (err) {
//         console.log(err);
//     });
// };

exports.find = function(source, query) {
    var extractor = null;

    try {
        var extractor = require('./extractor/' + source);
    }
    catch (e) {
        console.log(e);
        throw "No extractor for '" + source + "' exists";
    }

    return extractor
    .find(query)
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
        console.log(e);
        throw "No extractor for '" + source + "' exists";
    }

    return extractor
    .findOne(query)
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
        throw "No extractor for '" + source + "' exists";
    }

    return extractor
    .get(id)
    .catch(function (err) {
        console.log(err);
    });
};
