export const currentDate = () => {
  return currentTime().split(",")[0];
};

export const currentTime = () => {
  return new Date().toLocaleString();
};

export const getUUID = () => {
  return Math.random().toString(16).slice(2);
};
