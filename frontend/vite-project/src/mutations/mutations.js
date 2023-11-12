// mutations.js

import { gql } from "@apollo/client";

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const ADD_USER = gql`
  mutation AddUser($user: AddUserInput!) {
    addUser(user: $user) {
      id
      name
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $edits: EditUserInput!) {
    updateUser(id: $id, edits: $edits) {
      id
      name
      email
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($post: AddPostInput!) {
    addPost(post: $post) {
      id
      title
      body
      author {
        id
        name
        email
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $edits: EditPostInput!) {
    updatePost(id: $id, edits: $edits) {
      id
      title
      body
    }
  }
`;
