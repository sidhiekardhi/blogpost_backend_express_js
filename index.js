const express= require('express');

const app= express();
const productRouter = require('./src/routes/products')
const bodyParser= require('body-parser')
const authRoutes = require('./src/routes/Auths')
const blogRoutes = require('./src/routes/blog')
const mongoose = require('mongoose')
const multer = require('multer')
const MongoClient = require('mongodb').MongoClient;
const path = require('path')
const port = process.env.PORT || 4000



const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype==='image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use((req, res, next)=> {
res.setHeader('Access-Control-Allow-Origin', '*')
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
next()
})

app.use('/', productRouter)
app.use('/v1/auth', authRoutes)
app.use('/v1/blog', blogRoutes)

app.use((error, req, res, next) => {
    const status= error.errorStatus || 500;
    const message = error.message;
    const data= error.data;
    res.status(status).json({message : message, data: data})
})



// const uri = "mongodb+srv://sidhiek_ardhi:wPYf8ZVELk3ODHKB@cluster0.uqa5h.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const uri = "mongodb+srv://sidhiek_ardhi:123a456b@cluster0.uqa5h.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("students")
//    .then(db => console.log('DB conectada'))
//    .catch(err => console.log(error));
//  });



mongoose.connect('mongodb://sidhiek_ardhi:123a456b@cluster0-shard-00-00.uqa5h.mongodb.net:27017,cluster0-shard-00-01.uqa5h.mongodb.net:27017,cluster0-shard-00-02.uqa5h.mongodb.net:27017/test?replicaSet=atlas-14654d-shard-0&ssl=true&authSource=admin', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
    app.listen(port, () => console.log("connection success"));
    // console.log("connection success")
})  
.catch(err => console.log(err))

