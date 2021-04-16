import { gql } from '@apollo/client'

export default gql`
    query ($city: String!, $type: String!, $foor: String!, $id:ID!){
        SimilarProps(city: $city, type: $type, foor: $foor, id: $id){
            title
            city
            type
            foor
            price
            main_photo
        }
    }
`;