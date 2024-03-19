import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI();

export async function about_gen(image_url) {
  console.log(image_url);
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "what is this image of give me json respose of 'name, category, description' ",
          },
          {
            type: "image_url",
            image_url: `${image_url}`,
          },
        ],
      },
    ],
  });
  return response.choices[0];
  // console.log(response.choices[0]);
}
