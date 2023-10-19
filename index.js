let expressInit = require("express");
let mongooseInit = require("mongoose");
let enviroSet = require("dotenv");
let UserProfile=require('./models/UserProfileSchema')
let { typeDefs } = require("./mainSchema");
let { resolvers } = require("./mainResolver");
const app = expressInit();
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
let graphExec = require("@graphql-tools/schema");
let mongoose = require("mongoose");
let cors=require('cors')
app.use(cors())
enviroSet.config();

const databaseConnect = process.env.DATABASE_CONNECTION;

mongoose
  .connect(databaseConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((databaseSuccess) => {
    console.log("The database is connected.");
  })
  .catch((databaseError) => {
    console.log("The database is not connected.");
  });
let testUser=[
  {
    username:"gbc",
    firstname:"Current",
       lastname:"Grader",
        password:"assignment2",
         email:"testuser@gbc.ca",
        type:"admin"
  }
]
let insertUser=async()=>{
let checkUser=await UserProfile.findOne({username:'gbc'})
 if(!checkUser){
 await UserProfile.insertMany(testUser)  
 }

}
insertUser().then(()=>{
  console.log("Database Seeded")
})
let schema = graphExec.makeExecutableSchema({ typeDefs, resolvers });
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(process.env.MAIN_PORT, () => {
  console.log(`GraphQL is on ${process.env.MAIN_PORT}`);
});
