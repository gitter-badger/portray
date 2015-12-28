exports.getResolutionObject = function(width, height) {
    var resolution = {
        ratio: null,
        megapixels: null,
        width: width,
        height: height,
    };

    resolution.ratio = resolution.width / resolution.height;
    resolution.megapixels = resolution.width * resolution.height / 1000000;

    return resolution;
};
