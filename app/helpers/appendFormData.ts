import { FormValues } from '@/app/lib/definitions';

export const appendFormData = (formValues: FormValues) => {
  const formData = new FormData();
  for (const key in formValues) {
    if (key === 'main_image') {
      console.log(true);
      formData.append(key, formValues[key], formValues[key].name);
    } else if (key === 'images') {
      const images = formValues[key];
      images.forEach((file) => {
        formData.append('images', file, file.name);
      });
    } else if (key === 'sizes') {
      formData.append(key, JSON.stringify(formValues[key]));
    } else {
      formData.append(key, formValues[key]);
    }
  }

  return formData;
};
