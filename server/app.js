const express = require("express")
const cors = require("cors")
const multer = require("multer")
const fs = require("fs")
const ejs = require("ejs")

let app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'public/image')
    },
    filename: (req, file, cb)=> {
        cb(null, file.fieldname+'-'+Date.now()+'-'+file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
      fileSize: 4 * 1024 * 1024,
    },
    dest: './public/image/'
  });

app.use(cors({
    origin: "*"
}),express.static('./public'))
app.set('view engine', 'ejs')

app.get("/",(req,res)=>{
    let fileList = fs.readdirSync("./public/image","utf-8")
    res.render("index.ejs",{fileList})
})
app.post("/upload",upload.single('file'),(req,res)=>{  
    res.status(202).json({"msg":"Done."}) 
})

app.listen(8080,e=>{
    console.log("http://localhost:8080/");
})