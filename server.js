const express = require('express');

// const { graphqlHTTP } = require('express-graphql'); or use below
const expressGraphQL = require('express-graphql').graphqlHTTP;

const app = express();

app.use('/graphql', expressGraphQL({
    graphiql: true
}));

app.listen(4000, () => {
    console.log(`Now listening...`);
})