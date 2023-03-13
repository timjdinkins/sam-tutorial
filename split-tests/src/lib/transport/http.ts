export const response = (obj, code = 200) => {
  return {
    statusCode: code,
    body: JSON.stringify(obj),
  };
};

export const errorResponse = (message, err, code = 500) => {
  console.log("Error: ", message, " - ", err);
  return {
    statusCode: code,
    body: JSON.stringify({
      result: "error",
      message: err.message,
    }),
  };
};
