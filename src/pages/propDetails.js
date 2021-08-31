import React from 'react'
import { useQuery } from '@apollo/client'
import propsById from '../gql/queries/propsById'
import { useParams } from 'react-router-dom'
import MyGallery from '../components/gallery'
import Description from '../components/description'
import SimilarProps from '../components/similarprops'
const PropDetails = () => {
    let { id } = useParams();
    const {loading, data}=useQuery(propsById,{
        variables:{
            id
        }
    })
    return (
        <>
            {!loading && data && (
                <>
                    <MyGallery property={data.PropsById[0]}/>
                    <Description property={data.PropsById[0]}/>
                    <SimilarProps property={data.PropsById[0]}/>
                </>
            )}
        </>
    )
}

export default PropDetails;