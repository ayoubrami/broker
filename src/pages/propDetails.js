import React from 'react'
import { useQuery } from '@apollo/client'
import propsById from '../gql/queries/propsById'
import { useParams } from 'react-router-dom'
import MyGallery from '../components/gallery'
import Description from '../components/description'
import SimilarProps from '../components/similarprops'
const PropDetails = () => {
    let { id } = useParams();
    const {loading, error, data}=useQuery(propsById,{
        variables:{
            id
        }
    })
    return (
        <div>
            {!loading && data && (
                <>
                    <MyGallery property={data.PropsById[0]}/>
                    <Description property={data.PropsById[0]}/>
                    <SimilarProps property={data.PropsById[0]}/>
                </>
            )}
        </div>
    )
}

export default PropDetails;