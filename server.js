const express = require("express");
const morgan = require("morgan");
const db = require('./utils/db');
const cookieParser=require('cookie-parser')
//handle sessions
const session = require('express-session')
const mongoStore = require('connect-mongo')
// ===== Constants ===== //
const app = express();
const PORT = process.env.PORT || 8080;


// ===== Middlewares ===== //
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser())
//each user that visits our page
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUnintitialized:false,
    store: new mongoStore({mongoUrl:process.env.MONGO_URI})
}))


// ===== Routes ===== //
/**
 * @method GET
 * @route /
 * @description Root route
 */
app.get('/', (req, res) => {
    console.log(req.session)
    req.session.username='abe'
    req.session.jwtToken='jdfksaljfkdslajfkldas'
    req.session.views=(req.cookies.views|| 0) +1
    //get cookie
    // console.log(req.get('Cookie').split(';'[2]))
    // res.setHeader('Set-Cookie','userid=1')// set cookies
    res.send('server is up!');// response
});

// Mounted Routes ========================== //
app.use('/api/auth', require('./routes/auth'))



// ===== Main ===== //
db();
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));