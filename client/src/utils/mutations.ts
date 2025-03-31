import { gql } from "@apollo/client"

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }`

  export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
  `

  export const SAVE_BOOK = gql`
  mutation SaveBook($bookId: String!, $authors: [String]!, $description: String!, $title: String!, $link: String, $image: String) {
    saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, link: $link, image: $image) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
  `

  export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
  `