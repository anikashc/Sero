import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import colors from 'colors' ;
import morgan from 'morgan';
import { Server } from "socket.io";
import { createServer } from "http";
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import eateryRoutes from './routes/eateryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json());
app.use(cors());



// app.use(bodyParser.json({ limit: '30mb', extended: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// app.use(cors());
// app.use('/posts', postRoutes);

app.get('/', function(req, res) {

    res.send("Hello");
});

app.use('/api/eateries', eateryRoutes);
app.use('/api/orders', orderRoutes);

app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT|| 5000;



const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on("connection", (socket) => {
    //console.log("We have a new connection")
    

    socket.on('paid',({orderPaidId})=>{
        console.log(orderPaidId)
        socket.broadcast.emit('paidOrder', {orderPaidId});
    })
    socket.on('completed',({orderCompletedId})=>{
        console.log(orderCompletedId)
        socket.broadcast.emit('completedOrder', {orderCompletedId});
    })
    socket.on('cancelled',({orderCancelledId})=>{
        console.log(orderCancelledId)
        socket.broadcast.emit('cancelledOrder', {orderCancelledId});
    })
    socket.on('orderPlaced',()=>{
        socket.broadcast.emit('refreshOrders');
    })

    socket.on('disconnect',()=>{
        //console.log("User has left")        
    })
});


server.listen(PORT, () => console.log(`Server Running in ${process.env.NODE_ENV} on Port: http://localhost:${PORT}`.yellow.bold));
