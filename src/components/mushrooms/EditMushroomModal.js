import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import MushroomForm from '../shared/MushroomForm'
import { mushroomUpdate } from '../../api/mushroom'

const EditMushroomModal = (props) => {
    const { 
        user, show, handleClose, 
        msgAlert, triggerRefresh 
    } = props

    const [mushroom, setMushroom] = useState(props.mushroom)

    const handleChange = (e) => {
       
        setMushroom(prevMushroom => {
            const updatedName = e.target.name
            let updatedValue = e.target.value
            // this handles our number type

            // now we handle the checkbox
            if (updatedName === "isEdible" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "isEdible" && !e.target.checked) {
                updatedValue = false
            }

            const updatedMushroom = { [updatedName]: updatedValue }

            return { ...prevMushroom, ...updatedMushroom }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        mushroomUpdate(mushroom, user, props.mushroom._id)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: 'Updated mushroom!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Update Mushroom Failure' + error,
                    variant: 'danger'
                })
            })
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton/>
            <Modal.Body>
                <MushroomForm 
                    mushroom={ mushroom }
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update Mushroom"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditMushroomModal