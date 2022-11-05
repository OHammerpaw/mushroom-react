import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const FairyForm = (props) => {
    const {fairy, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Name:</Form.Label>
                <Form.Control 
                    placeholder="what's the Fairy's name?"
                    name="name"
                    id="name"
                    value= { fairy.name }
                    onChange={ handleChange }
                />
                <Form.Label>Description:</Form.Label>
                <Form.Control 
                    placeholder="describe the fairy..."
                    name="description"
                    id="description"
                    value= { fairy.description }
                    onChange={ handleChange }
                />
                <Form.Select
                    aria-label="Fairy Type"
                    name="type"
                    defaultValue={fairy.type}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="pixie">Pixie</option>
                    <option value="sprite">Sprite</option>
                    <option value="leprechaun">Leprechaun</option>
                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default FairyForm