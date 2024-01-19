import express from 'express'
const app = express();
import dotenv from 'dotenv'

dotenv.config({path : 'backend/config/config.env'});

// import EN Variables 
const PORT = process.env.BACKEND_PORT;
const MODE = process.env.NODE_ENV;

// import product routes 
import productRoutes from "./routes/products.js"

app.use("/api/v1", productRoutes);

app.listen(PORT, () =>{
    console.log(`Server Start Successfully on ${PORT} in ${MODE} mode`)
})