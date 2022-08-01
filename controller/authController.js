const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('../secrets/secret').JWT_KEY;
const path = require('path');

// signup user
module.exports.signup = async function signup(req,res){
    //console.log("post signup called",req.body);
    try{
        const tempdata = req.body;
        //console.log("signup called, data: ",tempdata);
        const user = await userModel.create(tempdata);
        if (user){
            //res.redirect('/user/login');
            res.json({
                status:"ok",
                message:"user signup success",
                data:user
            })
        }else{
            res.json({
                status:"error",
                message:"error while signup"
            })
        }
    }catch(err){
        //console.log("err ",err);
        res.json({
            status:"error",
            message:err.message
        })
    }
}

// login user
module.exports.login = async function login(req,res){
    try{
        let data = req.body;
        if (data.name){
            let user = await userModel.findOne({name:data.name});
            if (user){
                if (user.password == data.password){
                    let uid = user['_id'];
                    let jwt_ = jwt.sign({payload:uid},JWT_KEY);
                    res.cookie('login',jwt_,{httpOnly:true});
                    //res.redirect('/') // redirect to home page
                    res.json({
                        status:"ok",
                        "token":jwt_,
                        message:"User logged in",
                        data: user
                    })
                }else{
                    res.json({
                        status:"error",
                        message:"Credential do not match"
                    })
                }
            }else{
                res.json({
                    status:"error",
                    message:"Wrong Credentials"
                })
            }
        }else{
            res.json({
                status:"error",
                message:"Please enter valid user name"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

// protect Route to check user is logged in or not
module.exports.protectRoute = async function protectRoute(req,res,next){
    try{
        let token;
        //console.log(req.cookies);
        if (req.cookies && req.cookies.login){
            token = req.cookies.login;
            let payload = jwt.verify(token,JWT_KEY);
            if (payload){
                const user = await userModel.findById(payload.payload);
                req.id = user.id;
                next();
            }else{
                // browser - redirect to login
                const client = req.get('User-Agent');
                if (client.includes('Mozilla')==true){
                    return res.redirect('/login'); // please login
                }else{
                    res.json({
                        status:"error",
                        message:"Please retry"
                    })
                }
            }
        }else{
            res.json({
                status:"error",
                message:"please log in"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.logout = function logout(req,res){
    res.cookie('login','',{maxAge:1});
    res.json({
        status:"ok",
        message:"User log out success"
    })
}

module.exports.getSignUp = function getSignUp(req,res){
    const p = path.join(__dirname,'..','public','signUpForm.html');
    res.sendFile(p);
    //res.sendFile('signUpForm.html',{root:__dirname});
}

module.exports.getLogin = function getLogin(req,res){
    const p = path.join(__dirname,'..','public','loginForm.html');
    res.sendFile(p);
}
