export const formidable = (values: any) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    if (!value) continue;
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item instanceof File) {
          formData.append(key, item);
        } else {
          formData.append(key, item as string);
        }
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, value as string);
    }
  }

  for (const pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  return formData;
};