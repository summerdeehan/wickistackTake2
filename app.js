const express = require('express');
const morgan = require('morgan');
const path = require('path');
const layout = require('./views/layout');
const {Page, User, db}  = require('./models/');
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

//check db connection
// db.authenticate().
// then(() => {
//   console.log('connected to the database');
// })

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

app.get('/', (req, res, next) => {
    try {
        res.redirect('/wiki');
    } catch (err) {
        next(err);
    } 
});

//errorHandling
const PORT = 3000;
const init = async () => {
   await db.sync() 
   app.listen(PORT, () =>{
     console.log(`listening on port ${PORT}`);
   });      
}
init();


module.exports= app;