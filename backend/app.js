import express from 'express'
const app = express();
import dotenv from 'dotenv'

dotenv.config({path : 'backend/config/config.env'});

const PORT = process.env.BACKEND_PORT;

app.listen(PORT, () =>{
    console.log(`Server Start Successfully on ${PORT}`)
})