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