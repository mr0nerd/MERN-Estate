import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authrouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to DB');
}).catch((err)=>{
    console.log(err);
});
const app =express();
app.use(express.json());

app.use(cookieParser());

app.listen(process.env.PORT,()=>{
    console.log('server is running o port 3000!!');
})

app.use('/api/user',userRouter);
app.use('/api/auth',authrouter);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });