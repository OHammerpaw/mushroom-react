import React, { useEffect, useState } from 'react' 
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import { mushroomDelete, mushroomShow } from '../../api/mushroom'
import EditMushroomModal from './EditMushroomModal'
import NewFairyModal from '../faeries/NewFairyModal'
import ShowFairy from '../faeries/ShowFairy'
import LoadingScreen from '../shared/LoadingScreen'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const MushroomShow = ({ user, msgAlert }) => {

    const [mushroom, setMushroom] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [fairyModalShow, setFairyModalShow] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mushroomShow(user, id)
            .then((res) => {
                setMushroom(res.data.mushroom)
            })
            .catch((error) => {
                msgAlert({
                    heading: 'Failure',
                    message: 'Show Mushroom Failure' + error,
                    variant: 'danger'
                })
            })
    }, [updated])

    const handleDeleteMushroom = () => {
        mushroomDelete(user, id)
        .then(() => {
            setDeleted(true)
            msgAlert({
                heading: 'Success',
                message: 'Deleting a Mushroom',
                variant: 'success'
            })
            
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Deleting a Mushroom Failure' + error,
                variant: 'danger'
            })
        })
    }

    let fairyCards
    if (mushroom) {
        if (mushroom.faeries.length > 0) {
           
           fairyCards = mushroom.faeries.map(fairy => (
                <ShowFairy
                    key={ fairy._id }
                    fairy={ fairy }
                    mushroom={ mushroom }
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }
   
    if (deleted) navigate('/mushrooms')
   

    if (!mushroom) {
        return <LoadingScreen />
    }

    return (
        <>
			<Container className="fluid">
                <Card>
                <Card.Header>{ mushroom.commonName }</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Scientific Name: { mushroom.scientificName }</small><br />
                            <small>
                                Edible?: { mushroom.isEdible ? 'yes' : 'no' }
                            </small>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => setFairyModalShow(true)}
                        className="m-2" variant="info"
                    >
                        Invite a fairy to the { mushroom.commonName }!
                    </Button>
                    { 
                        mushroom.owner && user && mushroom.owner._id === user._id 
                        ?
                        <>
                            <Button onClick={() => setEditModalShow(true)} className="m-2" variant="warning">
                                Edit Mushroom
                            </Button>
                            <Button onClick={() => handleDeleteMushroom()}
                                className="m-2"
                                variant="danger"
                            >
                                Delete { mushroom.commonName } 
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                { fairyCards }
            </Container>
            <EditMushroomModal 
                user={user}
                mushroom={mushroom}
                show={editModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            />
            <NewFairyModal 
                user={user}
                mushroom={mushroom}
                show={fairyModalShow}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setFairyModalShow(false)}
            />
        </>
    )
}

export default MushroomShow