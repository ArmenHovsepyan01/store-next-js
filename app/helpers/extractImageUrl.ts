export const extractImgUrl = (images: string) => {
  console.log(images, 'images');
  if (images.includes('[')) {
    console.log(JSON.parse(images));
    return JSON.parse(images);
  } else {
    return images;
  }
};
