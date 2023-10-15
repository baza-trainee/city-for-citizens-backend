// функція для обробки помилок майбутніх запитів в контроллерах
//  для читабельності коду, може стати в нагоді

const errorMessages = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
