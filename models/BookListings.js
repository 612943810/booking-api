let mongoose=require('mongoose')
let randomString=require('randomstring')
let UserBookingSchema= new mongoose.Schema({
    listing_id:{
        type:String,
        required:[true," Listing ID is required."],
    },
    booking_id:{
        default:randomString.generate({
            length:4,
            charset:'alphanumeric'
        }),
        type:String,
        required:[true,"Booking ID is required."]
    },
   booking_date:{
        type:String,
        required:[true,"Date is required."]
    },
    booking_start:{
        type:String,
        required:[true,"Date is required."]
    },
    booking_end:{
        type:String,
        required:[true,"Date is required."]
    },
    username:{
        type:String,
        required:[true,"Username is required."],
    unique:false
    }
})
    let  BookListing=mongoose.model("UserBooking",UserBookingSchema)
    module.exports=BookListing