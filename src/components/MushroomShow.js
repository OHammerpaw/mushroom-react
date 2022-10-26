import React, { useEffect, useState } from 'react' 
import { useParams } from 'react-router-dom'
import { mushroomShow, mushroomUpdate } from '../api/mushroom'
import MushroomUpdate from './MushroomUpdate'


const MushroomShow = ({ user, msgAlert }) => {

    const [mushroom, setMushroom] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)

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

    const toggleShowUpdate = () => {
        setIsUpdateShown(prevUpdateShown => !prevUpdateShown)
    }

    const handleChange = (event) => {
        setMushroom({...mushroom, [event.target.name]: event.target.value})
    }

    const handleUpdateMushroom = () => {
        mushroomUpdate(mushroom, user, id)
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Updating Mushroom',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Update Mushroom Failure' + error,
                variant: 'danger'
            })
        })
    }

    return (
        <>
            <h3>Common Name: {mushroom.commonName}</h3>
            <h1>Scientific Name: {mushroom.scientificName}</h1>
            <p>Edible? {mushroom.isEdible}</p>
            <button onClick={toggleShowUpdate}>Toggle Update</button>
				{isUpdateShown && (
					<MushroomUpdate
						mushroom={mushroom}
						handleChange={handleChange}
						handleUpdateMushroom={handleUpdateMushroom}
					/>
                )}
        </>
    )

}

export default MushroomShow