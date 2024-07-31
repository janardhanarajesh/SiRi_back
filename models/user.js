import mongoose from "mongoose";
const user=mongoose.Schema;
let newUser=new user({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
})
export default mongoose.model("User",newUser)