import { gql } from '@apollo/client'

export default gql`
    query{
        Me{
            id
            email
            name
            avatar
            phone_number
        }
    }
`