import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import colors from 'colors' ;
// import bodyParser from 'body-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import eateryRoutes from './routes/eateryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
// import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors());
// app.use('/posts', postRoutes);

app.get('/', function(req, res) {

    res.send("Hello");
});

app.use('/api/eateries', eateryRoutes);

app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT|| 5000;

app.listen(PORT, () => console.log(`Server Running in ${process.env.NODE_ENV} on Port: http://localhost:${PORT}`.yellow.bold));