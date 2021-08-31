import { gql } from '@apollo/client'

export default gql`
    mutation($id: ID!, $name:String!, $email: String!, $phone_number: String, $avatar: String){
        updateProfile(id: $id, name: $name, email: $email, phone_number: $phone_number, avatar: $avatar){
            success
        }
    }
`