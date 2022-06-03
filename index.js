// Now i am Creating Data base connection
let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');
mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Succesfully !!")
},
    error => {
        console.log("Database Error:" + error)
    }
)
//Now next video on Routes of Restful API ♥
//Now I am going to make port and server...
const bookRoute = require("./node-backend/routes/book.routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
//Now Create Static path
app.use(express.static(path.join(__dirname, 'dist/Bookstore')));
//API Root
app.use('/api', bookRoute);
//Port Create
const port = process.env.port || 8080;
app.listen(port, () => {
    console.log('Listening Port on:' +port);
});
//404 Error handler..
// 404 Handler
app.use((req, res , next) => {
    next(createError(400));
});
//Base Route
app.get('/',(req,res) =>{
    res.send('invalid Endpoint');
});
app.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, 'dist/Bookstore/index.html'));
});
app.use(function(err,req,res,next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});