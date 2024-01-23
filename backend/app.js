import express from 'express'
const app = express();
import dotenv from 'dotenv'
import { connectToDatabase } from './config/dbConnect.js';
import errorMiddleware from './middlewares/error.js';

// handle uncaught exception 
process.on("uncaughtException", (err) =>{
    console.log(`ERROR : ${err}`);
    console.log("Shutting down server due to uncaught exception");
    process.exit(1);
})

dotenv.config({path : 'backend/config/config.env'});

connectToDatabase();

app.use(express.json())

// import EN Variables 
const PORT = process.env.BACKEND_PORT;
const MODE = process.env.NODE_ENV;

// import product routes 
import productRoutes from "./routes/products.js"

app.use("/api/v1", productRoutes);

// using error middlewares 
app.use(errorMiddleware);

const server = app.listen(PORT, () =>{
    console.log(`Server Start Successfully on ${PORT} in ${MODE} mode`)
})

//handle unhandled Promise Rejection
process.on("unhandledRejection", (err) =>{
    console.log(`ERROR : ${err}`)
    console.log("Shutting down server due to Undandled Promise Rejection");
    server.close(()=>{
        process.exit();
    });
})