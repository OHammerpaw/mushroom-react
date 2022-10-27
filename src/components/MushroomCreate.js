import React, { useState } from 'react' 
import { mushroomCreate } from '../api/mushroom'

const MushroomCreate = ({ user, msgAlert }) => {

    const defaultMushroom = {
        commonName: '',
        scientificName: '',
        isEdible: false
    }

    const [mushroom, setMushroom] = useState(defaultMushroom)
    const [isChecked, setIsChecked] = useState(false)

    const handleChange = (event) => {
        setMushroom({...mushroom, [event.target.name]: event.target.value})
    }

    const handleCheckboxChange = (event) => {
        
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
                    placeholder='Common Name'
					value={mushroom.commonName}
					name='commonName'
					onChange={handleChange}
				/>
				<input
					type='text'
                    placeholder='Scientific Name'
					value={mushroom.scientificName}
					name='scientificName'
					onChange={handleChange}
				/>
                Is it edible?
                <input 
                    type='checkbox'
                    value={mushroom.isEdible}
                    name='isEdible'
                    checked={mushroom.isEdible}
                    onChange={handleCheckboxChange}
                />

				<button onClick={handleCreateMushroom}>Create Mushroom</button>
			</>
		)
}

export default MushroomCreate