import { gql } from '@apollo/client'

export default gql`
    query($city: String!, $foor: String, $type: String){
        FiltredProps(city: $city, foor: $foor, type: $type){
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