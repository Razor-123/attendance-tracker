const subjectModel = require('../models/subjectModel');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const JWT_KEY = require('../secret').JWT_KEY;

module.exports.addSubject = async function addSubject(req,res){
    try{
        //if (req===null || req===undefined) return res.json({status:"error",message:"Please Login"})
        const user_id = req.id;
        //console.log(user_id);
        // create subject
        const subject = await subjectModel.create(req.body);
        if (subject){
            // add subject id to usemodel subject list
            const user = await userModel.findById(user_id);
            if (user){
                user.subjects.push(subject._id);
                await user.save();
                res.json({
                    status:"ok",
                    message:"subject created success",
                    data:subject
                })
            }else{
                res.json({
                    status:"error",
                    message:"please log in"
                })
            }
        }else{
            res.json({
                status:"error",
                message:"error creating subject"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.getSubject = async function getSubject(req,res){
    try{
        let id = req.params.id;
        const data = await subjectModel.findById(id);
        if (data){
            res.json({
                status:"ok",
                message:"Subject info retrieved",
                data:data
            })
        }else{
            res.json({
                status:"error",
                message:"Wrong subject id"
            })
        }
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.updateSubject = async function updateSubject(req,res){
    try{
        let id = req.params.id;
        const datatobeupdated = req.body;
        const subject = await subjectModel.findById(id);
        //console.log("subject: ",subject);
        if (subject){
            const dateToday = new Date().toLocaleDateString('en-US');
            // console.log("date today: ",dateToday);
            const addtoattended = datatobeupdated['attended_lec_today'] - subject['attended_lec_today'];
            const addtototal = datatobeupdated['total_lec_today'] - subject['total_lec_today'];
            for (let key in datatobeupdated){
                //if (key==='attended_lec_today' || key==='total_lec_today')continue;
                subject[key] = datatobeupdated[key];
            }
            //console.log(subject['updatedAt'],dateToday)
            if (subject['updatedAt']===dateToday){
                //console.log("same day");
                subject['attended_lec'] += addtoattended;
                subject['total_lec'] += addtototal;
            }else{
                subject['attended_lec'] += datatobeupdated['attended_lec_today'];
                subject['total_lec'] += datatobeupdated['total_lec_today'];
                subject['updatedAt']=dateToday;
            }
            await subject.save();
            res.json({
                status:"ok",
                message:"Suject updated success",
                data:subject
            })
        }else{
            res.json({
                status:"error",
                message:"Wrong subject id"
            })
        }
    }
    catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}

module.exports.deleteSubject = async function deleteSubject(req,res){
    try{
        let id = req.params.id;
        let uid = req.id;
        const user = await userModel.findById(uid);
        if (user){
            user.subjects.remove(id);
            await user.save();
            const deletedData = await subjectModel.findByIdAndDelete(id);
            if (deletedData){
                res.json({
                    status:"ok",
                    message:"Subject deleted success",
                    data:deletedData
                })
            }else{
                res.json({
                    status:"error",
                    message:"No such subject exist"
                })
            }
        }else{
            res.json({
                status:"error",
                message:"Please Log In"
            })
        }
        
    }catch(err){
        res.json({
            status:"error",
            message:err.message
        })
    }
}