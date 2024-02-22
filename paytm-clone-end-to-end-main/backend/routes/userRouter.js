const express = require('express');
const zod=require('zod');
const authMiddleware=require('./middleware');
const { User, Account } = require('../db');
const jwtSecret = require('./config');
const jwt=require("jsonwebtoken");
const userRouter = express.Router();
userRouter.post("/signup",async(req,res)=>{
    const {username,firstName,lastName,password}=req.body;
    const signupSchema=zod.object({
        username:zod.string().email(),
        firstName:zod.string().min(3).max(50),
        lastName:zod.string().min(3).max(50),
        password:zod.string().min(6)
    });
        const {success}=signupSchema.safeParse(req.body);
        if(!success){
            return res.status(411).json({error:"invalid data"});
        }
    const found_user=await User.findOne({username});
    if(found_user){
        return res.status(411).json({error:"user already exists"});
    }
    const user = new User({username,firstName,lastName,password});
        await user.save();
        const UserId=user._id;
        Account.create({
            userId:UserId,
            balance:1+Math.random()*10000
        })
        return res.status(200).json({message:"user created"});
  

})
userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    try {
        const found_user = await User.findOne({ username, password });
        if (found_user) {
            const userId = found_user._id;
            const token = jwt.sign({ userId }, jwtSecret);
            return res.status(200).json({ token:token,
            firstName:found_user.firstName});
        } else {
            return res.status(411).json({ error: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error signing in:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

userRouter.put("/",authMiddleware, async(req,res)=>{
    const updateSchema=zod.object({
        firstName:zod.string().min(3).max(50),
        lastName:zod.string().min(3).max(50),
        password:zod.string().min(6)
    });
    const {success}=updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({error:"invalid credentials"});
    }
    const {userId}=req;
    const {firstName,lastName,password}=req.body;
    const updated_user=await User.findByIdAndUpdate(userId,{firstName,lastName,password})
    if(updated_user){
        return res.status(200).json({message:"user updated"});
    }
    else{
        return res.status(411).json({error:"error updating user"});
    }
})
userRouter.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || '';
    const page = parseInt(req.query.page) || 1;
    const pageSize = 4;

    try {
        const totalCount = await User.countDocuments({
            $or: [
                { firstName: { "$regex": filter } },
                { lastName: { "$regex": filter } }
            ]
        });
        
        const users = await User.find({
            $or: [
                { firstName: { "$regex": filter } },
                { lastName: { "$regex": filter } }
            ]
        })
        .limit(pageSize)
        .skip((page - 1) * pageSize);

        const totalPages = Math.ceil(totalCount / pageSize);

        res.json({
            users: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            })),
            totalPages: totalPages
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = userRouter;

