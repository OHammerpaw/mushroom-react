import React from 'react'

const MushroomUpdate = ({ mushroom, handleChange, handleUpdateMushroom }) => {
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
            <input 
            type='checkbox'
            value={mushroom.isEdible}
            name='isEdible'
            onChange={handleChange}
            />
			<button onClick={handleUpdateMushroom}>Update Mushroom</button>
		</>
	)
}

export default MushroomUpdate