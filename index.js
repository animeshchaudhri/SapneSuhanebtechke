import { v2 as cloudinary } from "cloudinary";
import express from "express";
import { removeDaBg } from "./bgrem.js";
import { about_gen } from "./clasification.js";
import { lifestyleimg } from "./Lifestyle.js";
let i = 0;
const app = express();
const port = 3000;

app.use(express.json());

let globalData = [
  {
    bgRemLinks: [],
  },
];

cloudinary.config({
  cloud_name: "drsgwyrae",
  api_key: "931313911945979",
  api_secret: "fMn0tfbPEP1vlq6A1WAoHqGLybg",
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

app.post("/process-images", async (req, res) => {
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
    // console.log(globalData[0].bgRemLinks);

    const imageClassification = await about_gen(globalData[0].bgRemLinks[i]);

    console.log(imageClassification);
    i++;
    const jsonResponse = JSON.parse(
      imageClassification.message.content.match(/```json\n([\s\S]*)\n```/)[1]
    );
    console.log(jsonResponse);
    // Extract the product name and category
    const productName = jsonResponse.name;
    const productCategory = jsonResponse.category;
    const productDEsc = jsonResponse.description;

    const Lifeimg = await lifestyleimg(
      globalData[0].bgRemLinks[0],
      productName
    );
    console.log(Lifeimg);

    const responseJson = {
      productName: productName,
      productCategory: productCategory,
      productDescription: productDEsc,
      productImage: globalData[0].bgRemLinks[i],
      lifestyleImage: Lifeimg,
    };
    res.json(responseJson);
    console.log("yes bro its done");
  } catch (err) {
    console.log(err);
  }
});
app.post("/image", async (req, res) => {
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
    // console.log(globalData[0].bgRemLinks);

    const imageClassification = await about_gen(globalData[0].bgRemLinks[i]);
    i++;
    console.log(imageClassification);
    const jsonResponse = JSON.parse(
      imageClassification.message.content.match(/```json\n([\s\S]*)\n```/)[1]
    );
    console.log(jsonResponse);

    const productName = jsonResponse.name;
    const productCategory = jsonResponse.category;
    const productDEsc = jsonResponse.description;

    const responseJson = {
      productName: productName,
      productCategory: productCategory,
      productDescription: productDEsc,
      productImage: globalData[0].bgRemLinks[i],
    };
    res.json(responseJson);
    console.log("yes bro its done");
  } catch (err) {
    console.log(err);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
