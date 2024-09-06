// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type Malmobo {
    id: ID!
    name: String!
    nickname: String!
    password: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    date: String!
    malmobo: Malmobo!
  }

  type Query {
    malmobos: [Malmobo!]!
    posts: [Post!]!
    malmobo(id: ID!): Malmobo
    post(id: ID!): Post
  }

# Define input types for Malmobo
input MalmoboInput {
  name: String!
  nickname: String!
  password: String!
}

input UpdateMalmoboInput {
  name: String
  nickname: String
  password: String
}

# Define input types for Post
input PostInput {
  title: String!
  content: String!
  date: String!
  malmoboId: ID!
}

input UpdatePostInput {
  title: String
  content: String
  date: String
}

# Mutations now use input types
type Mutation {
  createMalmobo(input: MalmoboInput!): Malmobo
  updateMalmobo(id: ID!, input: UpdateMalmoboInput!): Malmobo
  deleteMalmobo(id: ID!): Malmobo

  createPost(input: PostInput!): Post
  updatePost(id: ID!, input: UpdatePostInput!): Post
  deletePost(id: ID!): Post
}
`;
