import React from 'react'

const MushroomUpdate = ({ mushroom, handleChange, handleUpdateMushroom }) => {
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
            onChange={handleChange}
            />
			<button onClick={handleUpdateMushroom}>Update Mushroom</button>
		</>
	)
}

export default MushroomUpdate