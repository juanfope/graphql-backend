import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import { typeDefs, resolvers } from "./schema.js";

dotenv.config();

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();
server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}${server.graphqlPath}`);
});
