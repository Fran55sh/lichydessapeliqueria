const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path')
const upload = require('express-fileupload')
const flash = require('connect-flash');
const session = require('express-session')

const userRouter = require('./routes/UserRoutes');
const cursoRouter = require('./routes/cursosRoutes')
const paymentRoutes = require('./routes/paymentsRoutes')
const videoroutes = require('./routes/videosRoutes')

let config = require('./config')
require('./db/mongo')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.json());
app.use(express.static('views'))
app.use(upload())
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized: true
}))
app.use(flash());


app.use((req, res, next) =>{
    res.locals.success = (req.flash('success')[0])
    res.locals.globslUserId = (req.cookies.userId)
    next();
})

app.use(userRouter);
app.use(cursoRouter)
app.use(videoroutes)
app.use(paymentRoutes)

app.listen(config.port,()=>{
    console.log(`express server started on port http://localhost:${config.port}`);
});
