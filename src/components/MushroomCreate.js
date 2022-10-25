import React, { useState } from 'react' 
import { mushroomCreate } from '../api/mushroom'

const MushroomCreate = ({ user, msgAlert }) => {

    const defaultMushroom = {
        commonName: '',
        scientificName: ''
    }

    const [mushroom, setMushroom] = useState(defaultMushroom)

    const handleChange = (event) => {
        setMushroom({...mushroom, [event.target.name]: event.target.value})
    }

    const handleCreateMushroom = () => {
        mushroomCreate(mushroom, user)
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
			<>
				<input
					type='text'
					value={mushroom.commonName}
					name='commonName'
					onChange={handleChange}
				/>
				<input
					type='text'
					value={mushroom.scientificName}
					name='scientificName'
					onChange={handleChange}
				/>
				<button onClick={handleCreateMushroom}>Create Mushroom</button>
			</>
		)
}

export default MushroomCreate