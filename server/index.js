import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors' 
// import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import eateryRoutes from './routes/eateryRoutes.js'
// import cors from 'cors';

dotenv.config()

connectDB()
const app = express();

// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors());

//app.use('/posts', postRoutes); 


const PORT = process.env.PORT|| 5000;


app.get('/', function(req, res) {
    res.send("Hello");
});
app.use('/api/eateries', eateryRoutes);
app.listen(PORT, () => console.log(`Server Running in ${process.env.NODE_ENV} on Port: http://localhost:${PORT}`.yellow.bold))