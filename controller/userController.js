const userModel = require('../models/userModel');



module.exports.getUser = async function getUser(req,res){
    try{
        let id = req.id;
        const user = await userModel.findById(id);
        if (user){
            res.json({
                status:"ok",
                message:"user found",
                data:user
            })
        }else{
            res.json({
                status:"error",
                message:"User not found"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.getAllUser = async function getAllUser(req,res){
    try{
        const user = await userModel.find();
        if (user){
            res.json({
                status:"ok",
                message:"Users retrived",
                data: user
            })
        }else{
            res.json({
                status:"error",
                message:"No user found"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.updateUser = async function updateUser(req,res){
    try{
        const dataToBeUpdated = req.body;
        let id = req.params.id;
        const user = await userModel.findById(id);
        if (user){
            for (let key in dataToBeUpdated){
                user[key] = dataToBeUpdated[key];
            }
            await user.save();
            res.json({
                status:"ok",
                message:"User updated success",
                data:user
            })
        }else{
            res.json({
                status:"error",
                message:"No such user exist"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.deleteUser = async function deleteUser(req,res){
    try{
        let id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        if (user){
            res.json({
                status:"ok",
                message:"User deleted success",
                data: user
            })
        }else{
            res.json({
                status:"error",
                message:"No such user exists"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}