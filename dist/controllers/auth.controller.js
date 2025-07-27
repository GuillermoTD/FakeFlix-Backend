"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.login = void 0;
const UserSchema_1 = __importDefault(require("../models/UserSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Look up using the email
    const user = yield UserSchema_1.default.findOne({ email: req.body.email }).exec();
    //Validate if the user exist or not
    if (!user)
        return res.status(400).json("Email or Password is wrong");
    const evaluatePassword = yield user.validatePassword(req.body.password);
    //Validate the password send by the user
    if (!evaluatePassword)
        return res.status(400).json("Invalid Password");
    //create a encrypted token with the payload and the secret token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_TOKEN, {
        expiresIn: 60 * 60 * 24 // this token will last 24 hours
    });
    res.json("User loged in successfully");
});
exports.login = login;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*Creating the new user with the data provided by the client */
    const newUser = new UserSchema_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    /*Here password stored in user model is scrypted*/
    newUser.password = yield newUser.encryptPassword(newUser.password);
    //Use is saved in database
    const savedUser = yield newUser.save();
    //creatin a token with id of user like payload and secret token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.SECRET_TOKEN || "token_secret");
    console.log(savedUser);
    console.log("User Signed in successfully!");
    // res.header("auth-token",token).json({
    //   username:savedUser.username,
    //   email:savedUser.email,
    //   token:
    // })
    res.header("auth-token", token).json(savedUser);
});
exports.signin = signin;
