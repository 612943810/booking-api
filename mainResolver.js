const { GraphQLString, GraphQLError, formatError, __Type } = require("graphql");
const AdminListing = require("./models/AdminListing.js");
let UserProfile = require("./models/UserProfileSchema.js");
let UserBooking = require("./models/BookListings.js");
let resolvers = {
  Query: {
    loginUser: async (parentQuery, argQuery) => {
      let loginValid = await UserProfile.findOne({})
        .where("username")
        .equals(argQuery.loginInput.username)
        .where("password")
        .equals(argQuery.loginInput.password);
      let findBooking = await UserBooking.find({username:argQuery.loginInput.username});
      let findListing = await AdminListing.find({username:argQuery.loginInput.username});
      if (!loginValid) {
        return {
          __typename: "ErrorMessage",
          message:
            "You are not authorized to use our services.Please register or try another website.",
        };
      }
      if (loginValid.type == "customer") {
        return {
          __typename: "UserLoginCheck",
          message: "You have sucessfully logged in as user.",
          booking: findBooking,
        };
      } else if (loginValid.type == "admin") {
        return {
          __typename: "AdminLoginCheck",
          message: "You have sucessfully logged in as admin.",
          listing: findListing,
        };
      }
    },
    getUserProfile:async(parentQuery,argQuery)=>{
return UserProfile.findOne({username:argQuery.personInput.username})
    },
    getAdminListings: async (
      parentQuery,
      argQuery,
      contextQuery,
      infoQuery
    ) => {
      return await AdminListing.find({});
    },
    getCustomerListings: async (
      parentQuery,
      argQuery,
      contextQuery,
      infoQuery
    ) => {
      return await UserBooking.find({});
    },
    searchListings: async (parentQuery, argQuery, contextQuery, infoQuery) => {
      if (argQuery.searchInput.listing_title) {
        return await AdminListing.find({
          listing_title: argQuery.searchInput.listing_title,
        });
      } else if (argQuery.searchInput.city) {
        return await AdminListing.find({ city: argQuery.searchInput.city });
      } else {
        return await AdminListing.find({
          postal_code: argQuery.searchInput.postal_code,
        });
      }
    },
  },
  Mutation: {
    addUserProfile: async (parentQuery, argQuery) => {
      let newUser = new UserProfile(argQuery.input);
      return await newUser.save();
    },

    createListing: async (parentQuery, argQuery, argContext) => {
      let newListing = new AdminListing(argQuery.listInput);
      let checkRoles = await UserProfile.findOne({
        username: argQuery.listInput.username,
        type: "admin",
      });
      if (checkRoles) {
        newListing.save();
        return {
          __typename: "AdminListing",
          ...argQuery.listInput,
        };
      } else {
        return {
          __typename: "ErrorMessage",
          message: "You dont have admin privilages.",
        };
      }
    },
    createBooking: async (parantQuery, argQuery) => {
      let checkRoles = await UserProfile.findOne({
        username: argQuery.bookInput.username,
        type: "customer",
      });
      let checkValidListing = await AdminListing.findOne({
        listing_id: argQuery.bookInput.listing_id,
      });
      let userBook = new UserBooking(argQuery.bookInput);
      if (!checkRoles && !checkValidListing) {
        return {
          __typename: "ErrorMessage",
          message: "This booking is not valid.",
        };
      }
      if (checkRoles && checkValidListing) {
        userBook.save();
        return {
          __typename: "BookListing",
          ...argQuery.bookInput,
        };
      } else {
        if (!checkRoles) {
          return {
            __typename: "ErrorMessage",
            message: "You don't have customer privilages.",
          };
        } else if (!checkValidListing) {
          return {
            __typename: "ErrorMessage",
            message: "There is no listing availible",
          };
        }
      }
    },
  },
};

module.exports = {
  resolvers,
};
