export const BaseURL = (apiUrl) => {
  const url = `http://localhost:5000/api/v1/${apiUrl}`;
  return url;
};
export const mediaUrl = (file) => {
  return `http://localhost:5000/${file}`;
};
