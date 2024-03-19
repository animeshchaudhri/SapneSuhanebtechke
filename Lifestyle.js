import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();
const replicate = new Replicate();
const input = {
  seed: 24603,
  image:
    "https://res.cloudinary.com/drsgwyrae/image/upload/v1710835343/lab_rat_2.jpg",
  prompt: "a modern mouse on a table with a laptop and a cup of coffee",
  apply_img: false,
  product_fill: "80",
  condition_scale: 0.8,
  negative_prompt: "",
  num_refine_steps: 20,
};

const output = await replicate.run(
  "catacolabs/sdxl-ad-inpaint:9c0cb4c579c54432431d96c70924afcca18983de872e8a221777fb1416253359",
  { input }
);
console.log(output);
