const mongoose = require('mongoose');

const db_link = 'mongodb+srv://shaleen:sallu123@cluster0.sq3e6zs.mongodb.net/?retryWrites=true&w=majority';

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
        required:true
    },
    total_lec:{
        type:Number,
        required:true,
        validate:function(){
            return this.total_lec <= 1000;
        }
    },
    attended_lec:{
        type:Number,
        required:true,
        validate:function(){
            return this.total_lec >= this.attended_lec;
        }
    },
    min_per:{
        type:Number,
        required:true,
        validate:function(){
            return this.min_per<=100;
        }
    },
    updatedAt:{
        type:String,
        default:new Date().toLocaleDateString('en-US')
    },
    total_lec_today:{
        type:Number,
        default:0,
        validate:function(){
            return this.total_lec_today <= this.total_lec
        }
    },
    attended_lec_today:{
        type:Number,
        default:0,
        validate:function(){
            return this.attended_lec_today<=this.attended_lec && this.attended_lec_today<=this.total_lec_today
        }
    }
});


const subjectModel = mongoose.model('subjectModel',subjectSchema);
module.exports = subjectModel;