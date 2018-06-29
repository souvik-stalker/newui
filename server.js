const express =require('express');

const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log =`${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('servr.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to file');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs');
// });


app.use(express.static(__dirname+"/public"));
app.get('/',(req,res)=>{
   res.render('home.hbs',{
    pageTitle:"Home Page",
    welcomeMessage:"Some Text Here"
   })
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:"About Page"
    });
});
app.get('/bad',(req,res)=>{
    res.send({
        errormsg:"Unable to Handle Request"
    });
});

app.listen(port,()=>{
    console.log(`Server is up on Port : ${port}`);
});