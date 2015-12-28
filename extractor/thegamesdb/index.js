var Promise = require('bluebird');
var gamesdb = Promise.promisifyAll(require('tgdb-api'));
var _ = require("lodash");
require("string_score");
var misc = require("../../misc");

var map = require('./map.json');

function filterByPlatform(query, result) {
  if (result.Platform === map.platform[query.platform].name) {
    return {
      name: result.GameTitle,
      id: result.id,
    }
  }
}

function parseImageData(obj) {
    var img = {
      type: null,
      url: null,
      resolution: null
    };

    img.url = "http://thegamesdb.net/banners/" + obj._;
    img.resolution = misc.getResolutionObject(
      obj['$'].width,
      obj['$'].height
    );

    return img;
}

function mapImageResults(results) {
    var arr = [];

    _.forIn(results.Game.Images, function(values, key) {
      if (_.has(values, '_')) {
        var img = parseImageData(values);
        img.type = key;

        arr.push(img);
      }
      else {
        _.forIn(values, function(media) {
          var img = null;

          if (_.has(media, '_')) {
            img = parseImageData(media);
            img.type = key;
            arr.push(img);
          }
          else if (_.has(media, 'original')) {
            img = parseImageData(media.original);
            img.type = key;
            arr.push(img);
          }
        });
      }
    });

    return arr;
};

exports.search = function(query) {
  return gamesdb.GetGamesListAsync({
    name: query.name
  }).then(function(results) {
    results = _.map(results.Game, filterByPlatform.bind(null, query));
    results = _.compact(results);
    return Promise.resolve(results);
  })
  .then(function(results) {
    results = _.filter(results, function(result) {
      result.score = result.name.score(query.name);
      return result;
    });

    return Promise.resolve(results);
  })
};

exports.get = function(id) {
  return gamesdb.GetGameAsync({
    id: id
  })
  .then(function(result) {
    return Promise.resolve({
      name: result.Game.GameTitle,
      //platform: result.Game.PlatformId,
      summary: result.Game.Overview,
      media: {
        images: mapImageResults(result)
      }
    });
  });
};