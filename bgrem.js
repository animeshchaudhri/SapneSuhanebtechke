import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const removeDaBg = (imageLink) => {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_url', imageLink);
    formData.append('bg_color', 'ffffff');

    axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
            ...formData.getHeaders(),
            'X-Api-Key': 'YpF6GHLYLdN4DmaMZhAsWFbr',
        },
        encoding: null
    })
        .then((response) => {
            if (response.status != 200) return console.error('Error:', response.status, response.statusText);
            fs.writeFileSync("./images/bgrem/no-bg.png", response.data);
        })
        .catch((error) => {
            return console.error('Request failed:', error);
        });
}
// removeDaBg("https://res.cloudinary.com/drsgwyrae/image/upload/v1710835343/lab_rat_2.jpg")
