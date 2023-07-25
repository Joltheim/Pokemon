import { useState, useEffect } from 'react'

const pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/'

const Pokemon = () => {
    const [name, setName] = useState ({
        pokemonName : '',
        pokemonImg : '',
    })
    const [info, setInfo] = useState("")
    const [answer, setAnswer] = useState(null)
    const [revealAnswer, setRevealAnswer] = useState(false)

    const randomNumber = (min = 1, max = 493) => {
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
        if(info.length !== 0) {
            if(info.trim().toLowerCase() === pokemonName) {
                console.log('correct!')
                setAnswer(true)
            } else {
                console.log('incorrect')
                setAnswer(false)
            }
        }
        setInfo('')
    }

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    const nextPokemon = () => {
        fetchPokemon()
        setAnswer(null)
        setRevealAnswer(false)
    }

    const showAnswer = () => {
        setRevealAnswer(true)
        console.log('show answer')
    }

    const {pokemonName, pokemonImg} = name
    return (
        <>
            <h2 style={{color: 'yellow'}}>Who's that Pokemon?!?</h2>
            <img style={{width: '300px'}} src={pokemonImg} alt={pokemonName} />
            {revealAnswer && <h2 style={{color: 'yellow', textTransform: 'capitalize'}}>It's {pokemonName}!</h2>}
            {answer !== null ? (
                answer ? (
                    <h2 style={{color: 'yellow', textTransform: 'capitalize'}}>
                        Correct It's {pokemonName}!
                    </h2> ) : (
                    <h2 style={{color: 'yellow', textTransform: 'capitalize'}}>
                        Incorrect - Try again?
                    </h2>
                    )
                ) : null
            }
            <div>
                <label style={{fontSize: '.9em', marginRight: '1rem', color: 'yellow'}} htmlFor='userEntry'>Enter Name:</label>
                <input 
                    type='text' 
                    id='userEntry'
                    value={info} 
                    onChange={(e) => setInfo(e.target.value)} 
                    onKeyDown={(e) => handleKeyDown(e)}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <button className='btn' onClick={() => showAnswer()}>Show Answer</button>
            <button className='btn' onClick={() => nextPokemon()}>Next Pokemon</button>
        </>
    )
}

export default Pokemon