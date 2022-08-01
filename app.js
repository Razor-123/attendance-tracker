const express = require('express');
const app = express();
const userRouter = require('./Routers/userRouter');
const cookieParser = require('cookie-parser');
const tempRouter = require('./Routers/tempRouter');
const cors = require('cors');
const client_home = require('./secrets/secret').client_home

app.use(cors({
    origin:`${client_home}`,
    credentials:true,
}));

const port = process.env.PORT || 3001;

app.use(express.static('public/build'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))


app.use('/user',userRouter);
app.use('/temp',tempRouter);

app.use(express.static('public'));
app.listen(port);

app.get('/login',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})

app.get('/signup',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})
app.get('/',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})
app.get('/addsubject',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})
app.get('/subject/:subject_id',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})
app.get('/',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})
