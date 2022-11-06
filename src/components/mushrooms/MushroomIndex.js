import React, { useEffect, useState } from 'react' 
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { mushroomIndex } from '../../api/mushroom'

const cardContainerLayout = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const MushroomIndex = ({ user, msgAlert }) => {

    const [allMushrooms, setAllMushrooms] = useState([])

    useEffect(() => {
        mushroomIndex(user)
        .then(res => {
            setAllMushrooms(res.data.mushrooms)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Mushrooms Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

    const allMushroomsJSX = allMushrooms.map(mushroom => {
        return (
            <Link to={`/mushrooms/${mushroom._id}`} key={mushroom._id}>
                <li>Common Name: {mushroom.commonName} Scientific Name: {mushroom.scientificName}</li>
            </Link>
        )
    })

    const mushroomCards = allMushrooms.map(mushroom => (
        <Card key={ mushroom.id } style={{ width: '30%', margin: 5 }}>
            <Card.Header>{ mushroom.commonName }</Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={ `/mushrooms/${mushroom._id}` }>View { mushroom.commonName }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div className='container-md' style={ cardContainerLayout }>
            { mushroomCards }
        </div>
    )
}

export default MushroomIndex