const express=require("express")
const {connection}=require('./config/db')
const {Url_Model}=require('./model/Urlmodel')

const app=express()

app.use(express.json())


app.listen(8080,async()=>{
    try {
        await connection;
        console.log('Server started on port 8080');
        
    } catch (error) {
        console.log(error);
    }
})

app.get('/',async (req,res)=>{
    let url=await Url_Model.find()
    // res.redirect('https://www.youtube.com/watch?v=SLpUKAGnm-g')
   res.send({"msg":"Home Page",url})
})


app.get('/:id',async(req,res)=>{
    let id=req.params.id;
try {
    let url=await Url_Model.findOne({sort_url:id })
   res.redirect(url.url)
   //res.send(url)
} catch (error) {
    res.send({"msg":"something went wrong"})
}

})


app.post('/',async(req,res)=>{
try {
    let url=new Url_Model(req.body)
    url.save();
    res.send("done")
} catch (error) {
    console.log(error);
}
})