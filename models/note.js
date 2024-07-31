import mongoose from "mongoose";
const note=mongoose.Schema;
let newnote=new note({
    username:{
        type:String,
        required:true
    },
    filename:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    }
})
export default mongoose.model("Note",newnote)