import { v2 as cloudinary } from 'cloudinary';
import express from 'express';
import {removeDaBg} from './bgrem.js';

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

const uploadToCloudinary = async (imageLink) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imageLink, options);
    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
}

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
  try{
    const linksArray = req.body.data;
    console.log(linksArray);
    linksArray.forEach(link_object => {
      removeDaBg(link_object.imageLink)
      let ling = uploadToCloudinary("./images/bgrem/no-bg.png")
      console.log(ling);
      globalData[0].bgRemLinks.push(ling);
    }
    );
    console.log(globalData[0].bgRemLinks);
  } catch(err) {
    console.log(err);
  }
  res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});