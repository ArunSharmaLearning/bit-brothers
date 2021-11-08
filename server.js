const express = require("express");
const app = express();
const usercontroller = require('./controller/controller');
const path = require('path')

require('./db/db');



app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');



app.use('/' , usercontroller);



app.listen(3000 ,  ()=>console.log('Running on port 3000'));