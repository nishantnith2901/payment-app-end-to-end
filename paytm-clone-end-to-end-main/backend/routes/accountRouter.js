const express = require('express');
const zod=require('zod');
const authMiddleware=require('./middleware');
const {Account } = require('../db');
const mongoose = require('mongoose');
const accountRouter = express.Router();
accountRouter.get('/balance',authMiddleware,async(req,res)=>{
    const {userId}=req;
    const account=await Account.findOne({userId});
    return res.status(200).json({balance:account.balance});
})
accountRouter.post('/transfer',authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    const {amount, to}=req.body;
    const {userId}=req;
    const account=await Account.findOne({userId}).session(session);
    if(!account || account.balance<amount){
        // session.abortTransaction();
        session.endSession();
        return res.status(200).json({msg:"low balance"});
    }
    const toAccount=await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        session.abortTransaction();
        session.endSession();
        return res.status(411).json({error:"invalid account"});
    }
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    await Account.updateOne({userId},{$inc:{balance:-amount}}).session(session);
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({msg:"transfer successful"});
})

module.exports=accountRouter;