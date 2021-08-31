import { gql } from '@apollo/client'

export default gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password){
            user {
                id
                email
                name
                avatar
                phone_number
            }
            accessToken
        }
    }
`;
