import { gql } from '@apollo/client'

export default gql`
    mutation($id: ID!, $password: String!, $newPassword: String!){
        updatePassword(id: $id, password: $password, newPassword: $newPassword){
            success
        }
    }
`