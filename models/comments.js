var mongoose=require("mongoose");

var commentschema=new mongoose.Schema({
    fname: String,
    lname: String,
    phone: Number,
    exp: Number,
    email: String,
    quallifications: String,
    city: String,
    state: String,
    documents:[{
        data:Buffer
    }]
    
    // author: {
    //     id: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "user"
    //     },
    //     username: String
    // }
});
module.exports=mongoose.model("comment",commentschema);  