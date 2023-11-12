// queries.js

import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      posts {
        id
        title
        body
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        id
        title
        body
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      title
      body
      id
      category
      subCategory
      coverImage
      authorId
      author {
        email
        name
        userAvatar
      }
    }
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      body
      category
      subCategory
      createdAt
      coverImage
      author {
        email
        name
        userAvatar
      }
    }
  }
`;
