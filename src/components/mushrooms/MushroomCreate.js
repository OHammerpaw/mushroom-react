import React, { useState } from 'react' 
import { mushroomCreate } from '../api/mushroom'
import { useNavigate } from 'react-router-dom'

import MushroomForm from '../shared/MushroomForm'

const MushroomCreate = ({ user, msgAlert }) => {
    const navigate = useNavigate()

    const defaultMushroom = {
        commonName: '',
        scientificName: '',
        isEdible: false
    }

    const [mushroom, setMushroom] = useState(defaultMushroom)
   

    const handleChange = (event) => {
        setPet(prevMushroom => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
           

            // now we handle the checkbox
            if (updatedName === "isEdible" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "isEdible" && !e.target.checked) {
                updatedValue = false
            }

            const updatedMushroom = { [updatedName]: updatedValue }

            return { ...prevMushroom, ...updatedMushroom }
        })
    }


    const handleCreateMushroom = (e) => {
        e.preventDefault()

        mushroomCreate(mushroom, user)
        .then(res => { navigate(`/mushrooms/${res.data.mushroom.id}`)})
        .then(() => {
            msgAlert({
                heading: 'Success',
                message: 'Create Mushroom',
                variant: 'success'
            })
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Create Mushroom Failure' + error,
                variant: 'danger'
            })
        })
    }

    return (
			<MushroomForm
                mushroom={ mushroom }
                handleChange= { handleChange }
                heading="Add a new mushroom!"
                handleSubmit={ handleCreateMushroom }
            />
		)
}

export default MushroomCreate