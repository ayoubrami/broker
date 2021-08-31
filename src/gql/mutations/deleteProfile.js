import { gql } from '@apollo/client'

export default gql`
    mutation($id: ID!){
        deleteProfile(id: $id)
    }
`