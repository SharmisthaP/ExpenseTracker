const express = require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');
require('dotenv').config();

const app=express();
const port=process.env.PORT || 7000;
//const hostname = process.env.HOST || 'localhost';

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
/*app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});*/

require("./config/passport")(passport);

const db = require("./config/keys").mongoURI;// Connect to MongoDB
mongoose
  .connect(
    db,
    {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


const usersRouter = require('./routes/users');
app.use('/users',usersRouter);
const listsRouter = require('./routes/expense_lists');
app.use('/expense_lists',listsRouter);
const eventsRouter = require('./routes/events');
app.use('/events', eventsRouter);

if(process.env.NODE_ENV === 'production')
{
  app.use(express.static('expense_tracker/build'));

  app.get('*',(req,res)=>{

    res.sendFile(path.resolve(__dirname +'/../build/index.html'));
  });
}

app.listen(port,() =>{
  console.log(`Server running at :${port}/`);
});
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  });