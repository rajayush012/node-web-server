const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFileSync('server.log',log + '\n');
    console.log(log); 
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   // res.send('<h1>Hello World!</h1>');
    // res.send({
    //     name: 'Ayush',
    //     likes: [
    //         'loving Samriddhi',
    //         'Eating her too'
    //     ]
    // });
    res.render('home.hbs',{
        title: 'Welcome Home!',
        body: 'Here is the body',
    
    })
});

app.get('/about', (req,res)=>{
    //res.send('about page');
    res.render('about.hbs',{
        title: 'About page!',
        
    })
});

app.get('/projects', (req,res)=>{
    
    res.render('projects.hbs',{
        title: "It's my project page!",
        projects: [{
            title: "Pro1",
            content: "Djangooo"
        },{
            title: "Pro2",
            content: "nodeeeee"
        }]
        
    })
});

app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Failed to load the page'
    });
});
app.listen(port, () => {
    console.log(`Server is up on port ${port} !`);
});