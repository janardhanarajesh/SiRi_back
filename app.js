import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import User from "./models/user.js"
import Note from "./models/note.js"
const app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
mongoose.connect("mongodb+srv://janardhanarajesh2:WORiY9viHsJ9DlxJ@siri.dssg85q.mongodb.net/siri?retryWrites=true&w=majority&appName=siri")
.then(()=>app.listen(2006))
.then(()=>console.log("connected to databse & listening to port 2006"))
app.use("/test",(req,res,next)=>{
    res.send("working")
})
app.get("/login/:uname/:upassword",async(req,res,next)=>{
    const usere=req.params.uname;
    const userpasswrod=req.params.upassword;
    try{
let user=await User.find({username:usere,password:userpasswrod})
if(user.length==0)
{
    return res.status(200).json({msg:"notfound"})
}
else{
    return res.status(201).json({msg:"found"})
}
    }
    catch(err){
console.log(err)
    }
})
app.get("/check/:uname",async(req,res,next)=>{
    const user=req.params.uname;
    try{
        let u=await User.find({username:user});
        if(u.length==0)
        {
            return res.status(200).json({msg:"notfound"})
        }
        else{
            return res.status(201).json({msg:"found"})
        }
    }
    catch(err)
    {
        console.log(err)
    }
})
app.post("/register",(req,res,next)=>{
const{username,password,email}=req.body.user;
let u=new User({
    username,
    password,
    email
})
try{
u.save()
res.status(200).json({msg:"success"})
}
catch(err){
console.log(err)
}
})
app.get("/findnote/:fname/:uname",async(req,res,next)=>{
    const f=req.params.fname;
    const u=req.params.uname;
    try{
        let note = await Note.find({username:u,filename:f})
        if(note.length==0)
        {
            return res.status(200).json({msg:"notfound"})
        }
        else{
            return res.status(201).json({msg:"found"})
        }
    }
    catch(err){
        console.log(err)
    }
})
app.post("/postnote",(req,res,next)=>{
    const{note,username,filename}=req.body.notes;
    let no=new Note({
        username,
        filename,
        note
    })
    try{
     no.save();
     return res.status(200).json({msg:"success"})   
    }
    catch(err){
        console.log(err)
    }
})
app.get("/getf/:user",async(req,res,next)=>{
    const u=req.params.user;
    try{
        let file=await Note.find({username:u})
        return res.status(200).json({msg:"found",file})

    }
    catch(err)
    {
        console.log(err)
    }
})
app.delete("/delnot/:r",async(req,res,next)=>{
    const id=req.params.r;
    try{
        let n=await Note.findByIdAndDelete(id)
        return res.status(200).json({msg:"deleted"})
    }
    catch(err)
    {
        console.log(err)
    }
})

app.put("/update/:not/:fil",async(req,res,next)=>{
    const u=req.params.fil;
    const note=req.params.not;
    try{
        let nu= await Note.findByIdAndUpdate(u,{
            note
        })
        return res.status(200).json({msg:"updated"})
        
    }
    catch(err)
        {
            console.log("err")
        }
})
