import { v2 as cloudinary } from "cloudinary";
import express from "express";
import "dotenv/config";
import { about_gen } from "./services/bolo.js";
import { MongoClient, ServerApiVersion } from "mongodb";
import { appendFileSync } from "fs";
const uri = `mongodb+srv://harshit:${process.env.DB_KEY}@dicehack.fztdmtj.mongodb.net/?retryWrites=true&w=majority&appName=DiceHack`;

import cors from "cors";
import fs from "fs";
import path from "path";
import axios from "axios";

let i = 0;
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

let globalData = [
  {
    bgRemLinks: [],
  },
];

cloudinary.config({
  cloud_name: "drsgwyrae",
  api_key: process.env.Cl_KEY,
  api_secret: process.env.Cl_KEY2,
});

const uploadToCloudinary = async (imagePath) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath);
    console.log(result.secure_url);
    console.log("edher hai url");
    return result.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const downloadImage = async (image_url) => {
  try {
    const response = await axios.get(image_url, {
      responseType: "arraybuffer",
    });
    const imageData = Buffer.from(response.data, "binary");
    const fileName = "hello.png";
    fs.writeFileSync(fileName, imageData);

    console.log(`Image downloaded: ${fileName}`);
  } catch (error) {
    console.error(error);
  }
};

const imagedowloder = async (image_url) => {
  await downloadImage(image_url);
};

app.post("/saveto", async (req, res) => {
  const dataa = req.body;
  console.log(dataa);
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();

  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  const collectionName = "DiceHack";
  const db = client.db("hacker");
  const result = await db.collection(collectionName).insertOne(dataa);
  console.log("Data inserted successfully:", result.insertedId);
  const csv = `${dataa.data.productName},${dataa.data.productCategory},${dataa.data.productDescription},${dataa.data.productImage},${dataa.data.lifestyleImage}\n`;
  try {
    appendFileSync("./results.csv", csv);
  } catch (error) {
    console.log(error);
  }

  res.sendFile(path.join(process.cwd(), "results.csv"));
});

app.get("/fetch", async (req, res) => {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();

  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
  const collectionName = "DiceHack";
  const db = client.db("hacker");
  const data = await db.collection(collectionName).find().toArray();
  console.log("Fetched data:", data);
  res.json(data);
});

app.post("/process-images", async (req, res) => {
  const linksArray = req.body.data;

  try {
    for (const link_object of linksArray) {
      const imagePath = link_object.imageLink;
      if (imagePath) {
        const cloudinaryUrl = await uploadToCloudinary(imagePath);
        if (cloudinaryUrl) {
          globalData[0].bgRemLinks.push(cloudinaryUrl);
        }
      }
    }

    const productimage = globalData[0].bgRemLinks[i];
    await imagedowloder(globalData[0].bgRemLinks[i]);
    const imageClassification = await about_gen(globalData[0].bgRemLinks[i]);

    i++;

    const jsonString = JSON.stringify(imageClassification);

    const strippedJsonString = jsonString
      .replace("```json", "")
      .replace("```", "");

    const jsonResponse = JSON.parse(strippedJsonString);

    const nameIndex = jsonResponse.indexOf('"name": ');
    const categoryIndex = jsonResponse.indexOf('"category": ');
    const descriptionIndex = jsonResponse.indexOf('"description": ');
    const categorySubstring = jsonResponse.substring(categoryIndex);
    const descriptionSubstring = jsonResponse.substring(descriptionIndex);
    const nameSubstring = jsonResponse.substring(nameIndex);
    const commaIndex = nameSubstring.indexOf(",");
    const nameValue = nameSubstring.substring(9, commaIndex - 1);
    const categoryValue = categorySubstring.substring(
      13,
      categorySubstring.indexOf(",") - 1
    );
    const descriptionValue = descriptionSubstring.substring(
      16,
      descriptionSubstring.indexOf(",") - 1
    );

    const productName = nameValue;
    const productCategory = categoryValue;
    const productDEsc = descriptionValue;

    console.log(productName);
    console.log(productCategory);
    console.log(productDEsc);

    const responseJson = {
      productName: productName,
      productCategory: productCategory,
      productDescription: productDEsc,
      productImage: productimage,
    };
    console.log(responseJson);
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
      const imagePath = link_object.imageLink;
      if (imagePath) {
        const cloudinaryUrl = await uploadToCloudinary(imagePath);
        if (cloudinaryUrl) {
          globalData[0].bgRemLinks.push(cloudinaryUrl);
        }
      }
    }

    const productimage = globalData[0].bgRemLinks[i];
    const img = await imagedowloder(globalData[0].bgRemLinks[i]);
    const imageClassification = await about_gen(globalData[0].bgRemLinks[i]);

    console.log(imageClassification);
    i++;

    const jsonString = JSON.stringify(imageClassification);
    console.log(jsonString);

    const strippedJsonString = jsonString
      .replace("```json", "")
      .replace("```", "");

    const jsonResponse = JSON.parse(strippedJsonString);
    console.log(jsonResponse);

    const nameIndex = jsonResponse.indexOf('"name": ');
    const categoryIndex = jsonResponse.indexOf('"category": ');
    const descriptionIndex = jsonResponse.indexOf('"description": ');
    const categorySubstring = jsonResponse.substring(categoryIndex);
    const descriptionSubstring = jsonResponse.substring(descriptionIndex);
    const nameSubstring = jsonResponse.substring(nameIndex);
    const commaIndex = nameSubstring.indexOf(",");
    const nameValue = nameSubstring.substring(9, commaIndex - 1);
    const categoryValue = categorySubstring.substring(
      13,
      categorySubstring.indexOf(",") - 1
    );
    const descriptionValue = descriptionSubstring.substring(
      16,
      descriptionSubstring.indexOf(",") - 1
    );

    const productName = nameValue;
    const productCategory = categoryValue;
    const productDEsc = descriptionValue;

    console.log(productName);
    console.log(productCategory);
    console.log(productDEsc);

    const responseJson = {
      productName: productName,
      productCategory: productCategory,
      productDescription: productDEsc,
      productImage: productimage,
    };
    console.log(responseJson);
    res.json(responseJson);
    console.log("yes bro its done");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
