import apiUrl from '../apiConfig'
import axios from 'axios'

export const mushroomCreate = (data, user) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/mushrooms',
		data: {
			mushroom: data,
		},
        headers: {
            Authorization: `Token token=${user.token}`
        }
	})
}

export const mushroomIndex = (user) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/mushrooms',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const mushroomShow = (user, id) => {
	return axios({
		method: 'GET',
		url: apiUrl + '/mushrooms/' + id,
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}


export const mushroomUpdate = (data, user, id) => {
	return axios({
		method: 'PATCH',
		url: apiUrl + '/mushrooms/' + id,
		data: {
			mushroom: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

export const mushroomDelete = (data, user, id) => {
	return axios({
		method: 'DELETE',
		url: apiUrl + '/mushrooms/' + id,
		data: {
			mushroom: data,
		},
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}