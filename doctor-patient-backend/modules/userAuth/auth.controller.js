const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
const { sendResponse } = require("../../helpers/requestHandler.helper");
const { generateJwt } = require("../../helpers/jwt.helper");

/**
 * Description: Register user into the application
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.register = async (req, res, next) => {
  try {
    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser) return sendResponse(res, true, 400, "User already exists.");
    req.body.password = await bcrypt.hash(req.body.password, 10);
    let saveUser = await UserModel.create(req.body);
    return sendResponse(
      res,
      true,
      200,
      "User register successfully.",
      saveUser
    );
  } catch (error) {
    console.log("error",error);
  }
};

/**
 * Description: Login user into the application
 * @param { email, password } req
 * @param {*} res
 * @param {*} next
 */
exports.login = async (req, res, next) => {
  try {
    console.log("login API runs")
    let email = req.body.email;
    let password = req.body.password;

    const getUser = await UserModel.findOne({ email: email });
    if (!getUser) return sendResponse(res, true, 404, "User not exists or Please enter valid email.");

    if (getUser && !(await bcrypt.compare(password, getUser.password)))
      return sendResponse(res, true, 404, "Invalid password.");

    let token =await generateJwt({ userId: getUser._id });
    if (token === undefined) {
      return sendResponse(
        res,
        false,
        400,
        "Something went wrong please try again."
      );
    }
    return sendResponse(res, true, 200, "Login successfully.", {
      getUser,
      token,
    });
  } catch (error) {
    console.log(error)
  }
};
