import { gql } from '@apollo/client'

export default gql`
    query ($id: ID!){
        Gallery (id:$id){
            main_photo
            img1
            img2
            img3
            img4
            img5
        }
    }
`;