const translateMessage = (message) => {
  const messages = {
    invalid_credentials: "La combinación de usuario y clave es incorrecta.",
    "The email has already been taken.": "Ya existe un usuario con ese correo.",
    "The password confirmation does not match.":
      "La confirmación de la contraseña no coincide.",
    "The password is incorrect.": "La contraseña es incorrecta.",
  };

  return messages[message] || message;
};
export default translateMessage;
