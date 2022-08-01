const express = require('express');
const app = express();
const userRouter = require('./Routers/userRouter');
const cookieParser = require('cookie-parser');
const tempRouter = require('./Routers/tempRouter');
const cors = require('cors');

app.use(cors({
    origin:'http://attend-op.herokuapp.com/',
    credentials:true,
}));

const port = process.env.PORT || 3001;

app.use(express.static('public/build'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


app.use('/user',userRouter);
app.use('/temp',tempRouter);

//app.use(express.static('public'));
app.listen(port);

app.get('/',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})

