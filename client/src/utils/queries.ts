import { gql } from "@apollo/client"

export const GET_ME = gql`
query Query {
    me {
      _id
      bookCount
      email
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
      username
    }
  }

`