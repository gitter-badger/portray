var rp = require('request-promise');
// var cheerio = require('cheerio');
var util = require('util');
var _ = require("lodash");

exports.parse = function(id) {
    return new Promise(function(resolve, reject) {
      url = 'http://store.steampowered.com/app/' + id;

      var json = {
        id: id,
        title : null,
        media: {
          images: [],
          videos: []
        },
        price: {
          standard: null,
          current: null
        },
        reviews: {
          score: null,
          total: null,
          summary: null
        },
        genres: []
      };

      var options = {
          uri: 'http://store.steampowered.com/api/appdetails/?appids=' + id
      };

      rp(options).then(function (result) {
          result = JSON.parse(result);
          json.title = result[id]['data'].name;
          json.description = result[id]['data'].description;
          json.website = result[id]['data'].website;
          json.genres = _.map(result[id]['data']['genres'], function(genre){
              return genre.description;
          });

          //json.media.videos = json.media.videos.concat(getMediaObjects('movies', result[id]['data']));
          json.media.images = json.media.images.concat(
              getBanners(id),
              getMediaObjects('screenshots', result[id]['data'])
          );

          return resolve(json);
      })
      .catch(function (err) {
          console.log(err);
      });
    });
}

function getMediaResolutionFromUrl(url) {
    var dimentions = url.split('.').reverse()[1].split('x');

    return getResolutionObject(dimentions[0], dimentions[1]);
}

function getResolutionObject(width, height) {
    var resolution = {
        ratio: null,
        megapixels: null,
        width: width,
        height: height,
    };

    resolution.ratio = resolution.width / resolution.height;
    resolution.megapixels = resolution.width * resolution.height / 1000000;

    return resolution;
}

function getMediaObjects(type, json) {
    return _.map(json[type], function(media) {

        var img = {
          type: null,
          url: null,
          resolution: null
        };

        img.url = media.path_full;
        img.type = 'screenshot';
        img.resolution = getMediaResolutionFromUrl(media.path_full);

        return img;
    });
}

function generateBannerImageObj(appid, size) {
    if (size == "default") {
        filename = '/header.jpg';
    }
    else {
        filename = '/capsule_' + size[0] + 'x' + size[1] + '.jpg';
    }

    var img = {
      type: "banner",
      url: "http://cdn.akamai.steamstatic.com/steam/apps/" + appid + filename,
      resolution: getResolutionObject(size[0], size[1])
    };

    return img;
};

function getBanners(appid) {
    var sizes = [
        ['171', '64'],
        ['184', '69'],
        ['231', '87'],
        ['467', '181'],
        ['616', '353'],
    ];

    return _.map(sizes, function(size) {
        return generateBannerImageObj(appid, size);
    });
};
