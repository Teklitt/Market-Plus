var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'djksz5job',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.uploader.upload('./endpoints/Designer.png', function(error, result) {
    if (error) {
      console.error(error);
    } else {
      // Use result.url to get the URL of the uploaded image
      console.log(result.url);
    }
  });