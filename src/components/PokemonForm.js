import React, { useState } from "react";
import { Form } from "semantic-ui-react";

function PokemonForm({ createPokemon }) {

  const [newPokemon, setNewPokemon] = useState({
    name: "",
    hp: "",
    frontUrl: "",
    backUrl: ""
  })

  function handleChange(e) {
    setNewPokemon({
      ...newPokemon, [e.target.name]: e.target.value
    })
  }

  function handleSubmit() {

    const shapePokemon = {
      name: newPokemon.name,
      hp: newPokemon.hp,
      sprite: {
        front: newPokemon.frontUrl,
        back: newPokemon.backUrl
      }
    }

    const config = {
      headers: { 'Content-Type': 'application/json' },
      method: "POST",
      body: JSON.stringify(shapePokemon)
    }


    fetch('http://localhost:3001/pokemon', config)
      .then(r => r.json())
      .then(createPokemon)
    setNewPokemon({
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    })

  }

  return (
    <div>
      <h3>Add a Pokemon!</h3>
      <Form
        onSubmit={(e) => handleSubmit(e)}>
        <Form.Group widths="equal">
          <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={handleChange} value={newPokemon.name} />
          <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={handleChange} value={newPokemon.hp} />
          <Form.Input
            fluid
            label="Front Image URL"
            placeholder="url"
            name="frontUrl"
            onChange={handleChange} value={newPokemon.frontUrl}
          />
          <Form.Input
            fluid
            label="Back Image URL"
            placeholder="url"
            name="backUrl"
            onChange={handleChange} value={newPokemon.backUrl}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </div>
  );
}

export default PokemonForm;
