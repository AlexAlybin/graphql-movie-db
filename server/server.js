const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/Schema")

const app = express();

mongoose.connection.once("open", ()=>console.log("Connected to DB"))

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Server started")
})