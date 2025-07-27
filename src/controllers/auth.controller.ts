import { Request, Response } from "express";
import User,{IUser} from "../models/UserSchema"
import Jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  
  //Look up using the email
  const user = await User.findOne({email:req.body.email}).exec()

  //Validate if the user exist or not
  if(!user)return res.status(400).json("Email or Password is wrong")

  const evaluatePassword:boolean = await user.validatePassword(req.body.password)

  //Validate the password send by the user
  if(!evaluatePassword)return res.status(400).json("Invalid Password");

  //create a encrypted token with the payload and the secret token
  const token:string = Jwt.sign({_id:user._id},process.env.SECRET_TOKEN as string,{
    expiresIn:60*60*24 // this token will last 24 hours
  })
  res.json("User loged in successfully")
 };

export const signin = async (req: Request, res: Response) => {
  /*Creating the new user with the data provided by the client */
  const newUser:IUser = new User({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  })

  /*Here password stored in user model is scrypted*/
  newUser.password = await newUser.encryptPassword(newUser.password)

  //Use is saved in database
  const savedUser = await newUser.save()

  //creatin a token with id of user like payload and secret token
  const token:string = Jwt.sign({_id:savedUser._id},process.env.SECRET_TOKEN || "token_secret")

  console.log(savedUser)

  console.log("User Signed in successfully!")
  
  // res.header("auth-token",token).json({
  //   username:savedUser.username,
  //   email:savedUser.email,
  //   token:
  // })
  res.header("auth-token",token).json(savedUser)

};
