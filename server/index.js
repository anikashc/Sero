import express from 'express';
import dotenv from 'dotenv'
import colors from 'colors'
import menus from './data/products.js'
// import bodyParser from 'body-parser';
import connectDB from './config/db.js';
// import cors from 'cors';

//import postRoutes from './routes/posts.js';
dotenv.config()

connectDB()
const app = express();

// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors());

//app.use('/posts', postRoutes); 


//const CONNECTION_URL = 'mongodb+srv://sero1CreateMakeBelieve:U1rbBc68vrymTEMI@sero1.qzsba.mongodb.net/<dbname>?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
//   .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);

app.get('/', function(req, res) {
    res.send("Hello");
});
app.get('/api/menu', function(req, res) {
  res.json(menus);
});
app.get('/api/menu/:id', function(req, res) {
  const menu = menus.find((p) => p._id===req.params.id)
  res.json(menu);
});
app.listen(PORT, () => console.log(`Server Running in ${process.env.NODE_ENV} on Port: http://localhost:${PORT}`.yellow.bold))