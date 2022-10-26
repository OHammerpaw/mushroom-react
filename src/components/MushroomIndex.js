import React, { useEffect, useState } from 'react' 
import { Link } from 'react-router-dom'
import { mushroomIndex } from '../api/mushroom'

const MushroomIndex = ({ user, msgAlert }) => {

    const [allMushrooms, setAllMushrooms] = useState([])

    useEffect(() => {
        mushroomIndex(user)
        .then(res => {
            setAllMushrooms(res.data.mushrooms)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Mushrooms Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allMushroomsJSX = allMushrooms.map(mushroom => {
        return (
            <Link to={mushroom._id} key={mushroom._id}>
            <li>Common Name: {mushroom.commonName}, Scientific Name: {mushroom.scientificName}, Edible?: {mushroom.isEdible} </li>
            </Link>
        )
    })

    return (
        <>
            <ul>{allMushroomsJSX}</ul>
        </>
    )
}

export default MushroomIndex