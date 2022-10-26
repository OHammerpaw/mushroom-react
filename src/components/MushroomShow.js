import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { mushroomShow, mushroomUpdate, mushroomDelete } from '../api/mushroom'
import MushroomUpdate from './MushroomUpdate'


const MushroomShow = ({ user, msgAlert }) => {

    const [mushroom, setMushroom] = useState({})
    const [isUpdateShown, setIsUpdateShown] = useState(false)
    const [deleted, setDeleted] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

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

    const deleteMushroom = () => {

        mushroomDelete(mushroom, user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleted Mushroom',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Delete Mushroom Failure' + error,
                variant: 'danger'
            })
        })
    }

    if (deleted) navigate('/mushrooms')

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
                <button onClick={deleteMushroom}>Delete</button>
        </>
    )

}

export default MushroomShow