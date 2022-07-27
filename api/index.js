const express = require("express") ;
const app = express() ;
const dotenv = require('dotenv') ;
const mongoose = require('mongoose') ;
const bodyParser = require("body-parser")
const cors = require("cors")

const authRoute = require("./routes/auth.js")
const usersRoute = require("./routes/users.js")
const postsRoute = require("./routes/posts.js")
const categoriesRoute = require("./routes/categories.js")

const multer = require("multer");
const path = require("path")

dotenv.config() ;

app.use( bodyParser.json() ) ;
app.use("/Images" , express.static(path.join(__dirname , "/Images")))


app.use(cors());

mongoose.connect(
    process.env.MONGO_URL
  )
  .then(()=>console.log('connected'))
  .catch(e=>console.log(e));

const storage = multer.diskStorage( {
    destination: (req,file,cb) => {
        cb(null , 'Images' );
    },
    filename: (req,file,cb) => {
        cb(null, req.body.name ) ;
    },
});



const upload = multer( {storage:storage} ) ; 
app.post("/api/upload" , upload.single("file") ,(req,res)=> {
    res.status(200).json("File has been uploaded") ;
});


app.use('/api/auth' , authRoute ) ;
app.use('/api/users' , usersRoute );
app.use('/api/posts' , postsRoute ) ; 
app.use('/api/categories' , categoriesRoute ) ; 


app.listen('9000' , ()=> {
    console.log('Backend is running') ;
});