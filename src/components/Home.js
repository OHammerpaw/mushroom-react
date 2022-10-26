import React from 'react'
import { Navigate } from 'react-router-dom'


const Home = (props) => {
	const { user } = props
	if (user) {
		return(
			<Navigate to='/mushrooms' />
		)
	}

	return (
		<>
			<h2>Welcome to The Mushroom Forest!</h2>
			<p>Please sign up or login to see all Mushrooms</p>
		</>
	)
}

export default Home
