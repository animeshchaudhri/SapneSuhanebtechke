import dotenv from "dotenv";
import Replicate from "replicate";

dotenv.config();
const replicate = new Replicate();

export async function lifestyleimg(imageLink, name) {
  const input = {
    seed: 24603,
    image: `${imageLink}`,
    prompt: `a modern ${name} on a table with a laptop and a cup of coffee`,
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
  return output;
}
