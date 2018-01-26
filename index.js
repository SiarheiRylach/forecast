const express = require('express'),
      request = require('request-promise'),
      exphbs = require('express-handlebars'),
      path = require('path');

const app = express();

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutDir: path.join(__dirname, 'views/layouts')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/:city', (req, res)=>{
    request({
        uri: 'http://apidev.accuweather.com/locations/v1/search',
        qs: {
            q: 'Minsk',
            apiKey: 'hoArfRosT1215'
        },
        json: true
    })
        .then((data)=>{
            res.render('home', data[0]);
        })
        .catch((err)=>{
            console.log(err);
            res.render('error', {error: err});
        });
});

app.listen(3000, (err)=>{
    if(err){
        return console.error("Something wrong", err)
    }

    console.log('Server is running');
});

