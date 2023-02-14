const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000
const dotenv = require('dotenv');
const { requireAuth, checkUser } = require('./src/middleware/authMiddleware');

const app = express();

dotenv.config()

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(cookieParser())

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.DB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => console.log('Database connected'))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser)
app.get('/', (req, res) => res.json({message: "Home"}));
app.use(authRoutes)

app.listen(port, ()=>{console.log('server running on port', port)})