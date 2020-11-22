var mongoose=require("mongoose");
// var passportlocalmongoose=require("passport-local-mongoose");

var userschema = new mongoose.Schema({
    city: String,
    state: String,
})

// userschema.plugin(passportlocalmongoose);

module.exports = mongoose.model("user", userschema);



