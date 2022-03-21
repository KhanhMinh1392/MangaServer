 
 
const http = require('http');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const mongoClient = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

mongoClient.connect('mongodb://localhost/web_manga', {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // useCreateIndex: true
})
  .then(() => console.log('Connect Successfully'))
  .catch((error) => console.error('Fail ${error}'))


const app = express();
const userRouter = require('./routes/user')
const cateRouter = require('./routes/category')
const comicRouter = require('./routes/comic')
const authorRouter = require('./routes/author')

// const  COURSES = [
//   { id:1, name :'NODE JS'},
//   {id:2,name : 'MONGO'},
// ]


// const db = require('./config/db/connect.js');
// const home = require('./resources/views');

// db.connect();


app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.urlencoded());
// app.use(express.json({
//   extended: true
// }));

app.use(morgan('combined'));



app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/users', userRouter)
app.use('/cate', cateRouter)
app.use('/comic', comicRouter)
app.use('/author', authorRouter)


app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500
  return res.status(status).json({
    error: {
      message: error.message
    }
  })
})

// app.engine('handlebars', exphbs.engine);
// app.set('view engine', 'handlebars');

// app.set('views',path.join(__dirname, 'resources', 'views'));



// const server = http.createServer((req,res)=>{
//   res.setHeader('Content-type','application/json')
//   res.end(JSON.stringify({
//     success:true,
//     data:COURSES
//   }));

// })
const port = app.get('port') || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})