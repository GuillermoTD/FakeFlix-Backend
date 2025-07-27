import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt"


export interface IUser extends Document{
    username:string,
    email:string,
    password:string,
    encryptPassword(password:string):Promise<string>
    validatePassword(password:string):Promise<boolean>
}


const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        min:4,// the minimum caracters
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    }
})
/*This method of user schema will return a promise that will resolve in a string */
/*This method will take the password en encrypt it ten times */
userSchema.methods.encryptPassword = async (password:string):Promise<string>=>{

    const salt = await bcrypt.genSalt(10)

    return bcrypt.hash(password,salt)
} 

/*This method will validate if the password passed is equal to the  */
userSchema.methods.validatePassword = async function(password:string):Promise<boolean>{
    return await bcrypt.compare(password,this.password)
}


export default model<IUser>("User",userSchema)