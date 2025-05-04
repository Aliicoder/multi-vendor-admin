export default (values:any) =>{
  const formData = new FormData();
  Object.keys(values).forEach((key) => {
    if (values[key] instanceof File) {
      formData.append(key, values[key]);
    } else {
      formData.append(key, String(values[key]));
    }
  })
  return formData
}