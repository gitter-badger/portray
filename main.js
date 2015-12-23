var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var Promise = require("bluebird");

// Use this json request
// http://store.steampowered.com/api/appdetails/?appids=239030

// Parse Datomatic XML fies for CRC
// //datafile/game/rom[@crc='E359F184']/..

exports.getMetaData = function(appid) {
  return new Promise(function(resolve, reject) {
    url = 'http://store.steampowered.com/app/' + appid;
    var json = {
      id: appid,
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

    request(url, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(!error) {
            var $ = cheerio.load(html);

            json.price.standard = $('.discount_original_price').text().trim() || $('.game_purchase_price.price').text().trim();
            json.price.current = $('.discount_final_price').text().trim();

            json.reviews.summary = $('.game_review_summary.positive').text().trim();

            $('.responsive_reviewdesc').filter(function() {
                var review = $(this)
                  .text()
                  .trim()
                  .split(' ');

                json.reviews.score = parseInt(review[1]) / 100;
                json.reviews.total = parseInt(review[4]);
            });


            $('.apphub_AppName').filter(function() {
                // Let's store the data we filter into a variable so we can easily see what's going on.

                var data = $(this);

                // In examining the DOM we notice that the title rests within the first child element of the header tag.
                // Utilizing jQuery we can easily navigate and get the text by writing the following code:

                json.title = data.text();
            });

            $('#highlight_strip .highlight_strip_item').each(function(i, elm) {
                if ($(elm).hasClass('highlight_strip_movie')) {
                  var vid_id = $(elm)
                    .find('img')
                    .attr('src')
                    .split('/')[5];

                  var new_vid = {
                    type: null,
                    url: "http://cdn.akamai.steamstatic.com/steam/apps/" + vid_id + "/movie480.webm",
                    resolution: {
                      width: 854,
                      height: 480
                    }
                  };

                  new_vid.resolution.ratio = new_vid.resolution.width / new_vid.resolution.height
                  new_vid.resolution.megapixels = new_vid.resolution.width * new_vid.resolution.height / 1000000

                  json.media.videos.push(new_vid);
                }

                else if ($(elm).hasClass('highlight_strip_screenshot')) {
                  var src = $(elm)
                    .find('img')
                    .attr('src')
                    .replace('116x65', '600x338')
                    .split('?')[0];

                  var new_img = {
                    type: "screenshot",
                    url: src,
                    resolution: {
                      width: 600,
                      height: 338
                    }
                  };

                  new_img.resolution.ratio = new_img.resolution.width / new_img.resolution.height
                  new_img.resolution.megapixels = new_img.resolution.width * new_img.resolution.height / 1000000

                  json.media.images.push(new_img);
                }
            });



            // $('.discount_original_price').filter(function() {
            //     // Let's store the data we filter into a variable so we can easily see what's going on.
            //
            //     var data = $(this);
            //
            //     // In examining the DOM we notice that the title rests within the first child element of the header tag.
            //     // Utilizing jQuery we can easily navigate and get the text by writing the following code:
            //
            //     json.price.standard = data.text();
            // });
            var new_img = {
              type: "banner",
              url: "http://cdn.akamai.steamstatic.com/steam/apps/" + json.id + "/capsule_184x69.jpg",
              resolution: {
                width: 171,
                height: 64
              }
            };

            new_img.resolution.ratio = new_img.resolution.width / new_img.resolution.height
            new_img.resolution.megapixels = new_img.resolution.width * new_img.resolution.height / 1000000

            json.media.images.push(new_img);
            new_img = null;

            var new_img = {
              type: "banner",
              url: "http://cdn.akamai.steamstatic.com/steam/apps/" + json.id + "/capsule_231x87.jpg",
              resolution: {
                width: 231,
                height: 87
              }
            };

            new_img.resolution.ratio = new_img.resolution.width / new_img.resolution.height
            new_img.resolution.megapixels = new_img.resolution.width * new_img.resolution.height / 1000000

            json.media.images.push(new_img);
            new_img = null;

            var new_img = {
              type: "banner",
              url: "http://cdn.akamai.steamstatic.com/steam/apps/" + json.id + "/header.jpg",
              resolution: {
                width: 460,
                height: 215
              }
            };

            new_img.resolution.ratio = new_img.resolution.width / new_img.resolution.height
            new_img.resolution.megapixels = new_img.resolution.width * new_img.resolution.height / 1000000

            json.media.images.push(new_img);
            new_img = null;

            var new_img = {
              type: "banner",
              url: "http://cdn.akamai.steamstatic.com/steam/apps/" + json.id + "/capsule_467x181.jpg",
              resolution: {
                width: 467,
                height: 181
              }
            };

            new_img.resolution.ratio = new_img.resolution.width / new_img.resolution.height
            new_img.resolution.megapixels = new_img.resolution.width * new_img.resolution.height / 1000000

            json.media.images.push(new_img);
            new_img = null;


            var new_img = {
              type: "banner",
              url: "http://cdn.akamai.steamstatic.com/steam/apps/" + json.id + "/capsule_616x353.jpg",
              resolution: {
                width: 616,
                height: 353
              }
            };

            new_img.resolution.ratio = new_img.resolution.width / new_img.resolution.height
            new_img.resolution.megapixels = new_img.resolution.width * new_img.resolution.height / 1000000

            json.media.images.push(new_img);
            new_img = null;
        }

        resolve(json);
    });
  });
}
