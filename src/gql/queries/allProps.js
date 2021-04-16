import { gql } from '@apollo/client'

export default gql`
query ($city: String) {
        Props (city: $city) {
                id
                title
                city
                type
                foor
                price
                main_photo
        }
}
`;