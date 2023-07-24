import { useState, useEffect } from 'react'

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'

const Pokemon = () => {
    const [name, setName] = useState ({
        pokemonName : '',
        pokemonImg : '',
    })
    const [info, setInfo] = useState("")

    const randomNumber = (min = 1, max = 151) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    const fetchPokemon = async () => {
        try {
            const response = await fetch(pokemonUrl + randomNumber())
            const data = await response.json()
            console.log(data.name)
            setName((prevName) => ({
                ...prevName, 
                pokemonName: data.name,
                pokemonImg: data.sprites.front_default,}))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPokemon(); 
    }, [])

    const handleSubmit = () =>{
        console.log(info)
        setInfo('')
    }

    const {pokemonName, pokemonImg} = name
    return (
        <>
            <h2 style={{color: 'yellow'}}>Who's that Pokemon?!?</h2>
            <img style={{width: '300px'}} src={pokemonImg} alt={pokemonName} />
            {pokemonName && (
                <h2 style={{color: 'yellow', textTransform: 'capitalize'}}>
                    Correct It's {pokemonName}!
                </h2>
            )}
            <label htmlFor='userEntry'>Enter Name:</label>
            <input type='text' id='userEntry' onChange={(e) => setInfo(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}

export default Pokemon

//Notes
//Determined that API call for multiple pokemon entries only returns name and url
//additional API calls are needed to get detailed info, might as well just do individual calls

//Issues to work on
//1. Add functionality to use 'enter' key - onKeyDown handler to input field
//2. Clear input field upon hitting submit key, issue with setInfo('') ln 36
//3. Add functionality to compare user input with {pokemonName}
    //3A if(userInput.length !== 0) - prevent anything from happening when field is empty
    //3B if(userInput === pokemonName) - check if user is correct, if so return correct / incorrect!
//4. add button to generate new pokemon

//Future changes - figure out css to grey out pokemonImg until user guesses