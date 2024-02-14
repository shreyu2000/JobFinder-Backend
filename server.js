const express =  require('express');
const app =  express();
const cors =  require('cors');
const connectDB = require('./db/dbconnect.js')
require('dotenv').config();

//database connection
connectDB();

//middlewares
//1.CORS
app.use(cors());

//2. EXPRESS
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))

//Health api
app.get("/api/v1/health" ,(req,res)=>{
    res.status(200).json({
        status: "active",
        service: "Job Listing Backend",
        time: new Date(),
    })
})

//use routes
const userRouter = require('./routes/user.routes.js');
const jobRouter = require('./routes/job.routes.js');

//declaring 
app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);


//PORT 
const PORT = process.env.PORT || 5000;
app.listen( PORT ,()=>{
    console.log(`Server is running on port ${PORT}`);
})

