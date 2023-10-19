let mongoose=require('mongoose')

let UserProfileSchema= new mongoose.Schema({
username:{
    type:String,
    required:[true,"Username is required."],
    unique:true,
    ref:'username'
},
firstname:{
    type:String,
    required:[true,"First name is required."]
},
lastname:{
    type:String,
    required:[true,"Last name is required."]
},
password:{
type:String,
required:true,
minlength:[6,"Passwork needs to be at least 6 characters"],
match:[/^[A-za-z0-9#$&_]*/,"This passwork is invalid."]   
},
email:{
    type:String,
    required:[true,"Email is required."],
    match:[/^[[A-Za-z0-9+\.?A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]]*/,"Email is not in valid format."],

},
type:{
    type:String,
    enum:['admin','customer'],
    message:"Type not found."
}
})

let UserProfile=mongoose.model("UserProfile",UserProfileSchema)
module.exports=UserProfile;