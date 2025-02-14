/*
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import adminRoutes from './routes/admin.route.js';

import cookieParser from 'cookie-parser';
import path from 'path';



dotenv.config();


mongoose
.connect(process.env.MONGO)
.then (() => {
    console.log('Connected to DB')

})
.catch ((err)=> {
    console.log(err)
});
const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req, res) =>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});
app.use(express.json());

app.use(cookieParser());
app.listen(3000,()=>{
    console.log('server listening in  port 3000!!')
});

// Add the routes
app.use('/api/user',userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/admin", adminRoutes);

app.use((err ,req ,res ,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    });

});
*/
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import adminRoutes from './routes/admin.route.js';
dotenv.config();
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('mongodb connected');
}).catch((err)=>{
    console.log(err);    
})

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500; 
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})

app.listen(3000,()=>{
    console.log('Server listening on port 3000');
    
})