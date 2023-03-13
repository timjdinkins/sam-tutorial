export const currentDate = (): string => {
  return currentTime().split(",")[0];
};

export const currentTime = (): string => {
  return new Date().toLocaleString();
};

export const getUUID = (): string => {
  return Math.random().toString(16).slice(2);
};
