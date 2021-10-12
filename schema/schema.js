const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql;

// dummy data (used with lodash)
const users = [
    {id: '3', firstName: 'Abe', age: 28},
    {id: '11', firstName: 'Eren', age: 18}
]


// This object tell graphql of how an user object 
// looks like or what properties it's supposed to have
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: graphql.GraphQLInt}
    }
});


// The RootQuery is how we provide graphql to enter our application data graph
// args is use to specify which argument we'll use in our query
// The resolve function is use to specify what piece of data will be return from our database
// in this case it  must return the data that represents an user object 
// (you'll nearly always return a promise from the the resolve function)
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLString}},
            resolve(parentValue, args) {
                // return _.find(users, {id: args.id})

                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data)
                    
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})