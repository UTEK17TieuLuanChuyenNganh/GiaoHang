const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch');

const indexRouter = require('./routes/index');
const nguoidungRoute = require('./routes/nguoidungRoute');
const buucucRoute = require('./routes/buucucRoute');
const chuoigiaohangRoute = require('./routes/chuoigiaohangRoute');
const diachiRoute = require('./routes/diachiRoute');
const donhangRoute = require('./routes/donhangRoute');
const dssanphamRoute = require('./routes/dssanphamRoute');
const loaisanphamRoute = require('./routes/loaisanphamRoute');
const sanphamRoute = require('./routes/sanphamRoute');
const shipperRoute = require('./routes/shipperRoute');
const lapchuoidonhangRoute = require('./routes/lapchuoidonhangRoute');
const thanhtoanRoute = require('./routes/thanhtoanRoute');
const thongbaoRoute = require('./routes/thongbaoRoute');
app.get('/sync', (req, res) => {
    let models = require('./models')
    models.sequelize.sync()
        .then((
            res.send('database sync completed')
        ));
});

app.use(bodyParser.json({ limit: '50mb' })) // for parsing application/json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


app.use('/nguoidung', nguoidungRoute);
app.use('/buucuc', buucucRoute);
app.use('/chuoigiaohang', chuoigiaohangRoute);
app.use('/diachi', diachiRoute);
app.use('/donhang', donhangRoute);
app.use('/dssanpham', dssanphamRoute);
app.use('/loaisanpham', loaisanphamRoute);
app.use('/sanpham', sanphamRoute);
app.use('/shipper', shipperRoute);
app.use('/lapchuoidonhang', lapchuoidonhangRoute);
app.use('/thanhtoan', thanhtoanRoute);
app.use('/thongbao', thongbaoRoute);
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//schedule



module.exports = app;