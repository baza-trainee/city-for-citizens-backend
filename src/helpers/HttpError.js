// функція для обробки помилок майбутніх запитів в контроллерах
//  для читабельності коду, може стати в нагоді
const errorMessages = {
  400: "Bad request",
  401: "Unathorized",
  400: "Forbidden",
  400: "Not Found",
  400: "Conflict",
};

const HttpError = (status, message = errorMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
