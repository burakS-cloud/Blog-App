export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String
    userAvatar: String
    email: String!
    posts: [Post!]
    # token: String
  }

  type Post {
    id: ID!
    title: String!
    body: String
    category: String
    subCategory: [String]!
    createdAt: String
    coverImage: String
    author: User!
    authorId: ID!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    posts: [Post]
    post(id: ID!): Post
  }
  type Mutation {
    addUser(user: AddUserInput!): User
    deleteUser(id: ID!): String
    updateUser(id: ID!, edits: EditUserInput!): User
    addPost(post: AddPostInput!): Post
    deletePost(id: ID!): String
    updatePost(id: ID!, edits: EditPostInput!): Post
  }
  input AddUserInput {
    name: String,
    email: String!
    userAvatar: String
  }
  input EditUserInput {
    name: String,
    email: String!
    userAvatar: String
  }
  input AddPostInput {
    title: String!,
    body: String,
    id: String
    category: String
    subCategory: [String]!
    coverImage: String
  }
  input EditPostInput {
    title: String,
    body: String,
    id: String
    category: String
    subCategory: [String]
    coverImage: String
  }
`;
