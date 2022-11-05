import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createFairy = (user, mushroomId, newFairy) => {
    console.log('the user in createFairy', user)
    console.log('the newFairy in createFairy', newFairy)
	return axios({
		url: `${apiUrl}/faeries/${mushroomId}`,
		method: 'POST',
		data: { fairy: newFairy }
	})
}

// UPDATE 
export const updateFairy = (user, mushroomId, updatedFairy) => {
    console.log('this is updatedFairy', updatedFairy)
	return axios({
		url: `${apiUrl}/faeries/${mushroomId}/${updatedFairy._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { fairy: updatedFairy }
	})
}

// DELETE 
export const deleteFairy = (user, mushroomId, fairyId) => {
	return axios({
		url: `${apiUrl}/faeries/${mushroomId}/${fairyId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}