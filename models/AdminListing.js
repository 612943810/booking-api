let mongoose=require('mongoose')

let ListingSchema= new mongoose.Schema({
listing_id:{
    type:String,
    required:[true,"ID is required."],
},
listing_title:{
    type:String,
    required:[true,"Title is required."]
},
description:{
    type:String,
    required:[true,"Description is required."]
},
street:{
type:String,
required:[true,"Street is required."]
},
city:{
    type:String,
    required:[true,"City is required."]
    },
postal_code:{
    type:String,
    required:[true,'Postal Code required.']
},
price:{
    type:Number,
    required:[true,"Price is required"],

},

email:{
    type:String,
    required:[true,"Email is required."],
    match:[/^[[A-Za-z0-9+\.?A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]]*/,"Email is not in valid format."],

},
username:{
    type:String,
    required:[true,"Username is required."]
},
})
// ListingSchema.virtual('userAccess',{
//     ref:'username',
//     localField:'UserProfile',
//     foreignField:'username'
// }
//)
let  AdminListing=mongoose.model("AdminListing",ListingSchema)
module.exports=AdminListing;