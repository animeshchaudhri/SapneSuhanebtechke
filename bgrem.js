import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

export const removeDaBg = (imageLink) => {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_url', imageLink);
    formData.append('bg_color', 'ffffff');

    return axios({
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
        if (response.status !== 200) {
            console.error('Error:', response.status, response.statusText);
            return null;
        }
        fs.writeFileSync("./images/bgrem/no-bg.png", response.data);
        return "./images/bgrem/no-bg.png";
    })
    .catch((error) => {
        console.error('Request failed:', error);
        return null; // Return null or handle the error as needed
    });
};
