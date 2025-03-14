const userModel = require("../models/userModel").userModel;

const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getGithubUser = (id) => {
    let user = userModel.findGithubID(id);
    if (user) {
        return user;
    }
    return null;
}

function addGithubUser(id, name) {
    let user = userModel.addUser(id, name);
    if (user) {
        return user;
    }
    return null;
}
module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  addGithubUser,
  getGithubUser,
};
