import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.OPENAI_API_KEY);
const openai = new OpenAI(
 
);

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Give me short prompt for making a marketing images background for this image ",
          },
          {
            type: "image_url",
            image_url:
              "https://res.cloudinary.com/drsgwyrae/image/upload/v1710835343/lab_rat_2.jpg",
          },
        ],
      },
    ],
  });
  console.log(response.choices[0]);
}
main();
