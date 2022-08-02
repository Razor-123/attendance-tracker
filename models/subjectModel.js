const mongoose = require('mongoose');

const db_link = require('../secrets/secret').db_link;

mongoose.connect(db_link)
    .then(db=>{
        console.log('subject db connected');
    })
    .catch(err=>{
        console.log('error connecting subject db : ',err);
    })

const subjectSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter Subject Name"]
    },
    total_lec:{
        type:Number,
        required:[true,"Enter Total lectures"],
        validate:{
            validator: function(){
                return this.total_lec <= 1000;
            },
            message:"Total Lectures should be less than 1000"
        }
    },
    attended_lec:{
        type:Number,
        required:[true,"Enter Attended Lectures"],
        validate:{
            validator:function(){
                return this.total_lec >= this.attended_lec;
            },
            message:"Attended Lectures are greater than Total Lectures"
        }
    },
    min_per:{
        type:Number,
        required:[true,"Enter Required Attendance"],
        validate:{
            validator:function(){
                return this.min_per<=100 && this.min_per>=0;
            },
            message:"Invalid Required Percentage"
        }
    },
    updatedAt:{
        type:String,
        default:new Date().toLocaleDateString('en-US')
    },
    total_lec_today:{
        type:Number,
        default:0,
        validate:{
            validator:function(){
                return this.total_lec_today <= this.total_lec
            },
            message:"Todays Lectures can not be greater than Total Lectures"
        }
        
    },
    attended_lec_today:{
        type:Number,
        default:0,
        validate:{
            validator:function(){
                return this.attended_lec_today<=this.attended_lec && this.attended_lec_today<=this.total_lec_today
            },
            message:"Invalid Lectures attended today"
        }
    }
});


const subjectModel = mongoose.model('subjectModel',subjectSchema);
module.exports = subjectModel;