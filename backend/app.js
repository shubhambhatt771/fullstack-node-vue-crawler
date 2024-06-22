import express from 'express';
import cors from 'cors';
const app = express();
import { config } from "dotenv";
import { elasticClient } from './utils/elasticClient.js';
import { connectDb } from './utils/db.js';
app.use(cors());

config();
const PORT = process.env.PORT ?? 5000;

connectDb();

app.listen(PORT, ()=>{
    console.log('server is listening on port ', PORT);
})