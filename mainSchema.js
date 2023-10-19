let graphqlExec = require("@graphql-tools/schema");

let typeDefs = `
type UserProfile {
    username:String!
    firstname:String!
    lastname:String!
    password:String!
    email:String!
    type:String! 
  }

  input UserProfileInput {
    username:String!
    firstname:String!
    lastname:String!
    password:String!
    email:String!
    type:String! 
 
  }

  type AdminListing{
    listing_id:String!
    listing_title:String!
    description:String!
    street:String!
    city:String!
    postal_code:String!
    price:Float!
    email:String!
    username:String!
  }
   
input AdminListingInput{
    listing_id:String!
    listing_title:String!
    description:String!
    street:String!
    city:String!
    postal_code:String!
    price:Float!
    email:String!
    username:String!
  }
  

input UserLogin {
    username:String!
    password:String!
  }

  input UserLoginValidation {
    username:String!
    password:String!
  }

type BookListing{
listing_id:String!
 booking_id:String
booking_date:String!
booking_start:String!
booking_end:String!
username:String!
  }


  input BookListingInput{
    listing_id:String!
    booking_id:String
    booking_date:String!
booking_start:String!
booking_end:String!
username:String!
  }
  
  type ErrorMessage{
  message:String!
}
input FindListing{
  listing_title:String
  city:String
  postal_code:String
}
type UserLoginCheck{
  message:String!,
booking: [BookListing!]
}
type AdminLoginCheck{
  message:String!,
listing: [AdminListing!]
}
  union determineList=AdminListing|ErrorMessage
  union determineBooking=BookListing|ErrorMessage
union determineLoginOutput=UserLoginCheck|AdminLoginCheck|ErrorMessage
 type Query{ 
loginUser(loginInput:UserLogin!):determineLoginOutput!
getUserProfile(personInput:UserProfileInput):UserProfile!
getCustomerListings:[BookListing!]
getAdminListings:[AdminListing!]
searchListings(searchInput:FindListing):[AdminListing!]
  }

type Mutation{
    addUserProfile(input:UserProfileInput!):UserProfile
    createListing(listInput:AdminListingInput!):determineList!
    createBooking(bookInput:BookListingInput!):determineBooking!
}
`;

module.exports = {
  typeDefs,
};
