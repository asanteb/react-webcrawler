const express = require('express')
const subdomain = require('express-subdomain')
const http = require('http')
const favicon = require('serve-favicon')

//To have subdomain routes working correctly, keep this order!//
const router = express.Router()
 // API ROUTES //
router.get('/', (req, res) => {
    res.send('This is a blank API route.');
})

const app = express()
app.use(subdomain('api', router)) // This can be used multiple times for different routers multiple subdomains. We use 'api' as an example
const server = http.createServer(app)

app.use(favicon(__dirname + '/build/favicon.ico')) //serves favicon ico in build folder
app.use(express.static('build')) //hosts all static files in build folder

app.all('/', (req, res, next)=>{ // For all routes we are passing access controll for the headers. This prevents cross-origin locking in the browser
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next()
})
/*
    Routes are simply passing the same static html file to the client.
    In ReactJS we can serve a single html file with multiple routes in the client side
    If you do however want to have multiple html files, point to that file in the directory
*/


app.get('/', (req, res)=>{
    res.sendFile(__dirname+'/build/index.html')
})

app.get('/favicon.ico', (req, res)=>{
 //This is empty because the favicon is already served. However we still need a route to avoid errors of it not existing
})

app.post('/sample-post:data', (req,res)=>{ // A dummy route to show how posts work
  console.log('Here is is some sample data: ', req.params.data)
})

//ERROR Handlers that send the client back static HTML, Text or JSON //
app.get('/404', (req, res, next)=>{
    //Route or Page Not Found
  next();
});
app.get('/403', (req, res, next)=>{
  // Forbidden Error or Not Authenticated
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', (req, res, next)=>{
  // Internal Server Error
  next(new Error('Internal Error!'));
});
/*
    For each of these app.use you can add different ways to send the client a response about there error
    Typically 404 Pages can have a fun type of look while the other errors can just display the raw error itself
*/
app.use((req, res, next)=>{
  res.status(404);

  //The error can be displayed in several formats bellow
  res.format({
    html: () => {
      res.sendFile(__dirname + '/build/404.html')
    },
    json: () => {
      res.json({ error: 'Not found' })
    },
    default: () => {
      res.type('txt').send('Not found')
    }
  })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err.status)
})

app.listen(3000) //Finally we set a port to listen to the server. Port 80 is for production
