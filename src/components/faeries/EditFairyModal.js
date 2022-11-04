import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import FairyForm from '../shared/FairyForm'
import { updateFairy } from '../../api/faeries'

const EditFairyModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh, mushroom 
    } = props

    const [fairy, setFairy] = useState(props.fairy)

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
        
        updateFairy(user, mushroom._id, fairy)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Fairy updated!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Fairy update failed',
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
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

export default EditFairyModal
