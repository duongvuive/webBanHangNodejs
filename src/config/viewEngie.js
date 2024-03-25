const express = require('express');
const app = express();
const path = require('path');
const configViewEngie=(app)=>{
    app.set('view engine', 'ejs');
    app.set('views',path.resolve(__dirname,'..','views'));
    
}
module.exports= configViewEngie;