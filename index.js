import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
const app = express();
const port = 3000;

// Define routes
app.get('/', async (req, res) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload("./images/lab_rat_2.jpeg", options);
    console.log(result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


cloudinary.config({
  cloud_name: 'drsgwyrae',
  api_key: '931313911945979',
  api_secret: 'fMn0tfbPEP1vlq6A1WAoHqGLybg'
});
