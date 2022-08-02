const mongoose = require('mongoose');

const db_link = require('../secrets/secret').db_link;

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
        unique:true,
        required:[true,"Please Enter the Username"]
    },
    password:{
        type:String,
        required:[true,"Please enter the password"],
        minLength:[8,"Password length must be eight"]
    },
    confirmPassword:{
        type:String,
        require:[true,"Please confirm the password"],
        validate:{
            validator: function(){
                return this.confirmPassword == this.password;
            },
            message:"Passwords not similar"
        }
    },
    subjects:[{ type : mongoose.Schema.ObjectId, ref: 'subjectModel' }]
});

// mongoose hooks
userSchema.pre('save',function(){
    this.confirmPassword = undefined;
});

userSchema.post('save',function(error,doc,next){
    if (error && error.name==="MongoServerError" && error.code === 11000) next(new Error('Username is already registered'));
    else next(error);
});

userSchema.pre(/^find/,function(next){
    this.populate("subjects")
    next();
})

const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;
