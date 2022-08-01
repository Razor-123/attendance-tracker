const express = require('express');
const app = express();
const userRouter = require('./Routers/userRouter');
const cookieParser = require('cookie-parser');
const tempRouter = require('./Routers/tempRouter');
const cors = require('cors');
const client_home = require('./secrets/secret').client_home
const path = require('path');

app.use(cors({
    origin:`${client_home}`,
    credentials:true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}))
app.use('/user',userRouter);
app.use('/temp',tempRouter);

const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === "production";
//console.log(process.env);
isProduction && app.use(express.static(path.join(__dirname,"public","build")));
isProduction &&
  app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname,"public","build","index.html"));
  });


app.listen(port);
app.get('/',(req,res)=>{
    res.json({
        message:"hello world!"
    })
})
