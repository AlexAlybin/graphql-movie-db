const graphql = require('graphql');
const MovieModel = require("../models/Movie")
const DirectorModel = require("../models/Director")

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql;

const MovieType = new GraphQLObjectType({
    name: "Movie",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent) {
                return DirectorModel.findById(parent.directorId)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: "Director",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(MovieType), resolve(parent, args) {
                // return movies.filter(movie => movie.directorId === parent.id)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return MovieType.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return directors.find(author => author.id === args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve() {
                return movies
            }
        }, directors: {
            type: new GraphQLList(DirectorType),
            resolve() {
                return directors
            }
        }
    }
})

const RootMutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addDirector: {
            type: DirectorType,
            args: {name: {type: GraphQLString}, age: {type: GraphQLInt}},
            resolve(parent, args) {
                const newDirector = new DirectorModel({
                    name: args.name,
                    age: args.age
                })
                return newDirector.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})