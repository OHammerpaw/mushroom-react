import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FairyForm from '../shared/FairyForm'
import { createFairy } from '../../api/faeries'

const NewFairyModal = (props) => {
    const { 
        user, mushroom, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [fairy, setFairy] = useState({})

    const handleChange = (e) => {
        setFairy(prevFairy => {
            const name = e.target.name
            let value = e.target.value

            // handle the checkbox
            if (name === "isEdible" && e.target.checked) {
                value = true
            } else if (name === "isEdible" && !e.target.checked) {
                value = false
            }

            const updatedFairy = { [name]: value }

            return {
                ...prevFairy, ...updatedFairy
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createToy(user, mushroom._id, fairy)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh yeah!',
                    message: 'Great! The mushroom loves them!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong! Please try again',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={ show } onHide={ handleClose }>
            <Modal.Header closeButton />
            <Modal.Body>
                <FairyForm 
                    fairy={fairy}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Invite a fairy!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewFairyModal