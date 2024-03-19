import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import { removeDaBg } from './bgrem.js';

const app = express();
const port = 3000;

app.use(express.json());

let globalData = [{
  bgRemLinks: []
}]

cloudinary.config({
  cloud_name: 'drsgwyrae',
  api_key: '931313911945979',
  api_secret: 'fMn0tfbPEP1vlq6A1WAoHqGLybg'
});

const uploadToCloudinary = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    console.log(result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    return null; // Return null or handle the error as needed
  }
};
/* 
cloudinary links
  data = [
    {
      imageLink: 'https://res.cloudinary.com/drsgwyrae/image/upload/v1710835343/lab_rat_2.jpg'
    },
    {
      imageLink: 'link'
    },{
      imageLink: 'link'
    },
  ]
*/

app.post('/process-images', async (req, res) => {
  let linksArray = req.body.data;

  try {
    for (const link_object of linksArray) {
      const imagePath = await removeDaBg(link_object.imageLink);
      if (imagePath) {
        const cloudinaryUrl = await uploadToCloudinary(imagePath);
        if (cloudinaryUrl) {
          globalData[0].bgRemLinks.push(cloudinaryUrl);
        }
      }
    }
    console.log(globalData[0].bgRemLinks);
  } catch (err) {
    console.log(err);
  }
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
