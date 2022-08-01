const mongoose = require('mongoose');

const db_link = 'mongodb+srv://shaleen:sallu123@cluster0.sq3e6zs.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(db_link)
    .then((db)=>{
        console.log('database connected');
    })
    .catch((err)=>{
        console.log('database connection error: ',err);
    })

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        require:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword == this.password;
        }
    },
    subjects:[{ type : mongoose.Schema.ObjectId, ref: 'subjectModel' }]
});

// mongoose hooks
userSchema.pre('save',function(){
    this.confirmPassword = undefined;
});

userSchema.post('save',function(error,doc,next){
    if (error && error.name==="MongoServerError" && error.code === 11000) next(new Error('Email/Username is already registered'));
    else next(error);
});

userSchema.pre(/^find/,function(next){
    this.populate("subjects")
    next();
})

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;
