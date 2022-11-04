import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteFairy } from '../../api/faeries'
import EditFairyModal from './EditFairyModal'

const ShowFairy = (props) => {
    const { fairy, mushroom, user, msgAlert, triggerRefresh } = props
    console.log('this is the props', props)

    const [editModalShow, setEditModalShow] = useState(false)

    // this will set the color of the card based on the condition
    const setBgCondition = (spec) => {
        if (spec === 'pixie') {
            return({ width: '18rem', backgroundColor: 'lightpink'})
        } else if (spec === 'sprite') {
            return({ width: '18rem', backgroundColor: 'lightblue'})
        } else {
            return({ width: '18rem', backgroundColor: 'lightgreen'})
        }
    }

    // this function removes a fairy, is only available to mushroom owner
    const destroyFairy = () => {
        deleteFairy(user, mushroom._id, fairy._id)
            .then(() => {
                msgAlert({
                    heading: 'Fairy evicted!',
                    message: 'Bye Bye!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            .catch(() => {
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(fairy.type)}>
                <Card.Header>{ fairy.name }</Card.Header>
                <Card.Body>
                    <small>{ fairy.description }</small><br/>
                    <small>Type: { fairy.type }</small>
                </Card.Body>
                <Card.Footer>
                    { 
                        user && mushroom.owner && user._id === mushroom.owner._id 
                        ?
                        <>
                            <Button
                                className="m-2" 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}  
                            >
                                Edit Fairy
                            </Button>
                            <Button 
                                className="m-2"
                                variant="danger"
                                onClick={() => destroyFairy()}
                            >
                                Evict Fairy
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditFairyModal 
                user={user}
                mushroom={mushroom}
                fairy={fairy}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
            />
        </>
    )
}

export default ShowFairy