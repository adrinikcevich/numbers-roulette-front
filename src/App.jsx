import { useState } from 'react'

import './App.css'

import RouletteWheel from './components/RouletteWheel'


function App() {
    const [randomNumber, setRandomNumber] = useState(null)
    const [showNumber, setShowNumber] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({ status: false, message: null })
    const [spinning, setSpinning] = useState(false)

    const [lastNumbers, setLastNumbers] = useState([])

    const updateLastNumbers = (num) => {
        setLastNumbers((prevList) => {
            const newList = [...prevList, num]
            return newList.slice(-3)
        })
    }
    const handleClick = async () => {
        setShowNumber(false)
        setRandomNumber(null)

        try {
            setError({ status: false, message: null })
            setLoading(true)
            let response = await fetch(import.meta.env.API_URL || 'http://localhost:3000/number', {
                method: 'POST',
            })
            let number = await response.json()

            setRandomNumber(number.value) 
            
            

        } catch (e) {
            setError({ status: true, message: e.message })
        } finally {
            setLoading(false)
            setSpinning(false)
        }
    }

    const handleAnimationEnd = () => {
        setSpinning(false)
        setShowNumber(false)
        updateLastNumbers(randomNumber)
    }
    return (
        <main>
            <div className="menu-container">
                <div>
                    <h3>Last Numbers</h3>
                    <div className="last-numbers-container">
                        {lastNumbers.map((num, i) => {
                            return (
                                <span
                                    className={num % 2 === 0 ? 'even' : 'odd'}
                                    key={i}
                                >
                                    {num}
                                </span>
                            )
                        })}
                    </div>
                </div>

                <button
                    className="spin-btn"
                    onClick={handleClick}
                    disabled={loading || spinning}
                >
                    Spin
                </button>

                <div className="error-msg-container">
                    {error.status && (
                        <span className="error-msg">
                            Error: {error.message}
                        </span>
                    )}
                </div>
            </div>
            {showNumber && (
                <div
                    className={`number-obtained-container`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <span className={`number-obtained ${
                        randomNumber % 2 === 0 ? 'even' : 'odd'
                    }`}>{randomNumber || 0}</span>
                </div>
            )}
            <RouletteWheel
                newNumber={randomNumber}
                setShowNumber={setShowNumber}
                setSpinning={setSpinning}
            />
            
        </main>
    )
}

export default App
