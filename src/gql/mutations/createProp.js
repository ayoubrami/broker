import { gql } from '@apollo/client'

export default gql`
    mutation (
        $owner: ID!,
        $title: String!,
        $foor: String!, 
        $type: String!, 
        $city: String!,
        $address: String!,
        $price: Int!,
        $description: String!,
        $specs: JSON!,
        $main_photo: String!,
        $images: [String!]!,
    ) {
        createProp(
            owner: $owner,
            title: $title,
            foor: $foor, 
            type: $type,
            city: $city,
            address: $address,
            price: $price,
            description: $description,
            specs: $specs,
            main_photo: $main_photo,
            images: $images,
        ){
            id
        }
    }
  
`