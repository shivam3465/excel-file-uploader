import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express'
import userRouter from './routers/user.js';
import cors from 'cors'

//creating express app 
const app = express();

//allowing cross origin requests
app.use(cors({
    origin: ["http://127.0.0.1:3000"],
    methods: ['GET','POST','PUT','DELETE'],
    credentials:true,
}))

app.get('/',(req,res)=>{
    res.send("welcome to home page");
})

// middlewares 
app.use(express.json({limit: "50mb"}));
app.use(urlencoded({extended: true,limit:"50mb"}));
app.use(cookieParser());

// redirecting requests from endpoint /api/v1 to user router
app.use('/api/v1',userRouter);

export {app}