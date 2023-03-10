const dotenv = require('dotenv');

dotenv.config({path:'./config.env'});

const express = require('express');

const cors = require('cors');

const User = require('./model/userModel');

const Message = require('./model/messageModel')

const db  = require('./config/dbConfig')

const userRoute = require('./router/userRoute')

const messageRoute = require('./router/messageRoute')

const app = express();

app.use(cors({
    origin:'*',
    methods:['GET','POST'],
    credentials:true
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use('/user',userRoute)

app.use('/user',messageRoute)

// db associations
User.hasMany(Message);
Message.belongsTo(User);

// db sync
db.sync().then((result)=>{
// console.log(result);
}).catch((err)=>{
    console.log(err);
})


app.listen(3000,()=>{
    console.log("server is running....!");
})