import express from 'express' // express framework
import cors from 'cors' // to connect frontend and backend
import 'dotenv/config' // Using dotenv to manage env variables
import songRouter from './src/routes/songRoutes.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';

// aap config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors()); // using this cors we connect the frontend and backend if the FE running on the another port no. and the backend on the another port it will connect the both

// initializing routes
app.use("/api/song",songRouter)
app.use('/api/album',albumRouter)

app.get('/',(req,res)=> res.send("API Working"))

app.listen(port,()=>console.log(`Server started on ${port}`))