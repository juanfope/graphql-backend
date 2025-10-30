import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import cors from "cors";
import { typeDefs, resolvers } from "./schema.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://graphql-frontend.onrender.com",
            "https://graphql-frontend-smoky.vercel.app",
        ],
        credentials: true,
    })
);

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

server.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Running at http://localhost:${PORT}${server.graphqlPath}`);
});
