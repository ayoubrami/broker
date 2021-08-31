import { gql } from '@apollo/client'

export default gql`
    mutation($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password){
            success
            accessToken
        }
    }
  
`