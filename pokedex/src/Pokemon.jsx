import { useState, useEffect } from 'react'

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'

const Pokemon = () => {
    const [name, setName] = useState ({
        pokemonName : '',
        pokemonImg : '',
    })

    const randomNumber = (min = 1, max = 600) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const randomPokemonId = randomNumber(1, 600)
    console.log(randomPokemonId)

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(pokemonUrl + randomPokemonId)
                const data = await response.json()
                setName((prevName) => ({
                    ...prevName, 
                    pokemonName: data.name,
                    pokemonImg: data.sprites.front_default,}))
            } catch (error) {
                console.log(error)
            }
        }
        fetchPokemon()  
    }, [])

    const {pokemonName, pokemonImg} = name
    return (
        <>
            <h2 style={{color: 'yellow'}}>Who's that Pokemon?!?</h2>
            <img style={{width: '300px'}} src={pokemonImg} alt={pokemonName} />
            <h2 style={{color: 'yellow', textTransform: 'capitalize'}}>Correct It's {pokemonName}!</h2>
            <input type='text' />
            <button>Submit</button>
            <div></div>
        </>
    )
}

export default Pokemon


