const express = require('express');
const connectDB = require('./database/config');
const app = express();
const User = require('./models/User');
const cors = require('cors');
require('dotenv').config();
//connection to mongoDB
connectDB();

app.use( express.static('public') );

//parse json
app.use(express.json());

//cors
app.use(cors());

app.use('/api/auth', require('./routes/auth'));

app.use('/api/products', require('./routes/products'));

app.use('/api/orders', require('./routes/orders'));

app.listen(process.env.PORT, ()=>{
    console.log(`Port ${process.env.PORT}listening . . .`)
})