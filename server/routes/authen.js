const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User =mongoose.model("User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {JWT_SECRET} = require("../valuekeys");
const user = require("../models/user");
const requireLogin = require("../middleware/requireLogin");
router.get("/",(req,res)=>{
    res.send("HEllo")
})
router.post("/signup",(req,res)=>{
    const {name,email,password} = req.body
    if(!email || !password || !name){
        res.json({error:"give all info"})

    }
    User.findOne({email:email}).then((savedUser=>{
        if(savedUser){
            return res.json({error:"used exists"})

        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
    
            user.save()
            .then(user=>{
                res.json({message:"saved"})
            }).catch(err=>{
                console.log(err);
            })

        })
        
    })).catch(err=>{
        console.log(err);
    })
    // res.json({message:"data is sent"})
    // console.log(req.body.name);
})

router.get("/protected", requireLogin,(req,res)=>{
    res.send("hello user");
})

router.post("/signin",(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(422).json({error:"plz add email or password"})
  
    }
    user.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"invalid credentials"})

        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
                const {_id,name,email} = savedUser
                res.json({token,user:{_id,name,email}})
            }
            else{
                return res.status(422).json({error:"invalid credentials"})
            }    
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router;