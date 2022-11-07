import { Form, Button, Container } from 'react-bootstrap'

const MushroomForm = (props) => {
    
    const { mushroom, handleChange, heading, handleSubmit } = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Common Name:</Form.Label>
                <Form.Control 
                    placeholder="enter common name of mushroom"
                    name="commonName"
                    id="commonName"
                    value= { mushroom.commonName }
                    onChange={ handleChange }
                />
                <Form.Label>Scientific Name:</Form.Label>
                <Form.Control 
                    placeholder="enter scientific name of mushroom"
                    name="scientificName"
                    id="scientificName"
                    value= { mushroom.scientificName }
                    onChange={ handleChange }
                />
                <Form.Check 
                    label="Is this mushroom edible?"
                    name="isEdible"
                    defaultChecked={ mushroom.isEdible }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default MushroomForm