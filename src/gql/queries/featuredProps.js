import { gql } from '@apollo/client'

export default gql`
    query{
        FeaturedProps(isfeatured: true){
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