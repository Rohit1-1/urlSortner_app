const mongoose=require('mongoose');
const shortId=require('shortid')
const Url_Schema=mongoose.Schema({
    url:String,
    sort_url:{
        type:String,
        
        default:shortId.generate
    }
})
const Url_Model=mongoose.model('urldata',Url_Schema);
module.exports={Url_Model}