import { gql } from "apollo-server-express";
import fetch from "node-fetch";
import students from "./students.json" with { type: "json" };

export const typeDefs = gql`
  type Image {
    url: String
  }

  type Breed {
    id: ID
    name: String
    origin: String
    temperament: String
    description: String
    life_span: String
    wikipedia_url: String
    image: Image
  }

  type Student {
    id: ID
    firstName: String
    lastName: String
    age: Int
    grade: String
    email: String
    major: String
    phone: String
    address: String
  }

  type Query {
    breed(id: ID!): Breed
    students: [Student!]!
  }
`;

export const resolvers = {
    Query: {
        students: () => students,
        breed: async (_, { id }, { theCatApiKey }) => {
            const response = await fetch("https://api.thecatapi.com/v1/breeds", {
                headers: theCatApiKey ? { "x-api-key": theCatApiKey } : {},
            });

            const data = await response.json();
            const found = data.find((b) => b.id === id);
            if (!found) return null;

            const imageRes = await fetch(
                `https://api.thecatapi.com/v1/images/search?breed_id=${id}&limit=1`
            );
            const imageData = await imageRes.json();

            return {
                ...found,
                image: imageData[0] ? { url: imageData[0].url } : null,
            };
        },
    },
};
