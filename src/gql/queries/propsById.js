import { gql } from '@apollo/client'

export default gql`
query ($id: ID!) {
        PropsById (id: $id) {
                id
                title
                city
                type
                foor
                price
                address
                description
                specs
        }
}
`;