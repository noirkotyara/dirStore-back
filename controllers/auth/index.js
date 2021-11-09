var getUserProfile = require("./getUserProfile");
var login = require("./login");
var register = require("./register").register;
var updateUserProfile = require("./update-user-profile").updateUserProfile;
var deleteUserProfile = require("./delete-user-profile").deleteUserProfile;

module.exports = {
  getUserProfile: getUserProfile,
  login: login,
  register: register,
  updateUserProfile: updateUserProfile,
  deleteUserProfile: deleteUserProfile,
};
