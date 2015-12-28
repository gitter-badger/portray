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

exports.search = function(source, query) {
    return require('./extractor/' + source)
    .search(query)
    .catch(function (err) {
        console.log(err);
    });
};

exports.get = function(source, id) {
    return require('./extractor/' + source)
    .get(id)
    .catch(function (err) {
        console.log(err);
    });
};
