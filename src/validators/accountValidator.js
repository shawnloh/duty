const verifyStandardCredentials = (username, password) => {
  if (!username) {
    return "username cannot be blank";
  }
  if (!password) {
    return "password cannot be blank";
  }
  return null;
};

const registerCredentials = (username, password) => {
  const error = verifyStandardCredentials(username, password);
  if (error) {
    throw new Error(error);
  }
  return {
    username,
    password,
    role: "user"
  };
};

const loginCredentials = (username, password) => {
  const error = verifyStandardCredentials(username, password);
  if (error) {
    throw new Error(error);
  }

  return {
    username,
    password
  };
};

module.exports = {
  registerCredentials,
  loginCredentials
};
