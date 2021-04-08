import { gql } from '@apollo/client'

export default gql`
query ($city: String) {
        Props (city: $city) {
                title
                city
                type
                foor
                price
                main_photo
        }
}
`;