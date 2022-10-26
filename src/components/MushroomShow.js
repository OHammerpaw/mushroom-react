import React, { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import { mushroomShow } from '../api/mushroom'


const MushroomShow = ({ user, msgAlert }) => {

    const [mushroom, setMushroom] = useState({})

    const { id } = useParams()

    useEffect(() => {
        mushroomShow(user, id)
        .then(res => {
            console.log(res.data, "<<<<<<<<<<<<<<")
            setMushroom(res.data.mushroom)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Show Mushroom Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    return (
        <>
            <h3>Common Name: {mushroom.commonName}</h3>
            <p>
                Scientific Name: {mushroom.scientificName},
                Edible? {mushroom.isEdible}
            </p>
        </>
    )

}

export default MushroomShow