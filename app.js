var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

//cannot run on port 5000
var port = process.env.PORT || 3000;

var nav = [
    {
        Link: '/Books',
        text: 'Book'
                        },
    {
        Link: '/Authors',
        text: 'Author'
    }];

var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('view engine', 'ejs');

//app.use(express.static('src/views'));
app.set('views', './src/views');

//app.set('view engine', 'jade');

/*var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({extname: '.hbs'}));
app.set('view engine', '.hbs');*/

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

app.get('/books', function (req, res) {
    res.send('Hello BOOKS');
});

app.listen(port, function () {
    console.log('running server on port ' + port);
});

/*app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});*/