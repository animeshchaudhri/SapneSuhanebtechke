import { GoogleGenerativeAI } from "@google/generative-ai";
import request from "request";
import fs from "fs";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType,
    },
  };
}

function base64_fromurl(url, mimeType) {
  request.get(url, { encoding: null }, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      let base64Image = Buffer.from(body).toString("base64");
      console.log(base64Image);
      return {
        inlineData: {
          data: base64Image,
          mimeType,
        },
      };
    }
  });
}

export async function about_gen(image_url) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt =
    "what is this image of give me json respose of 'name, category, description as product that has to listed";

  const imageParts = [fileToGenerativePart("hello.png", "image/png")];

  const result = await model.generateContent([prompt, imageParts]);
  const response = result.response;
  const text = response.text();
  return text;
}
